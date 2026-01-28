export type ActiveCampaignContact = {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  company?: string;
  message?: string;
  tags?: string[];
};

export type ActiveCampaignResponse = {
  success: boolean;
  contactId?: string;
  error?: string;
};

// Helper to log with timestamp for Vercel function logs
const log = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  if (data !== undefined) {
    console.log(`[${timestamp}] [ActiveCampaign] ${message}`, JSON.stringify(data, null, 2));
  } else {
    console.log(`[${timestamp}] [ActiveCampaign] ${message}`);
  }
};

const getEnvVars = () => {
  const vars = {
    apiUrl: process.env.ACTIVECAMPAIGN_API_URL,
    apiKey: process.env.ACTIVECAMPAIGN_API_KEY,
    listId: process.env.ACTIVECAMPAIGN_LIST_ID,
  };

  // Log configuration status (not values) for debugging
  if (!vars.apiUrl || !vars.apiKey) {
    log("Environment check", {
      hasApiUrl: !!vars.apiUrl,
      hasApiKey: !!vars.apiKey,
      hasListId: !!vars.listId,
    });
  }

  return vars;
};

const acFetch = async (endpoint: string, options: RequestInit) => {
  const { apiUrl, apiKey } = getEnvVars();

  if (!apiUrl || !apiKey) {
    log("API not configured - missing URL or API key");
    return null;
  }

  const url = `${apiUrl}/api/3${endpoint}`;

  try {
    log(`Making request to ${endpoint}`, { method: options.method });
    const response = await fetch(url, {
      ...options,
      headers: {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    log(`Response from ${endpoint}`, { status: response.status, ok: response.ok });
    return response;
  } catch (error) {
    log("Fetch error", { endpoint, error: error instanceof Error ? error.message : "Unknown" });
    return null;
  }
};

const addTagToContact = async (contactId: string, tagName: string) => {
  try {
    const tagSearchResponse = await acFetch(
      `/tags?search=${encodeURIComponent(tagName)}`,
      { method: "GET" }
    );

    let tagId: string | undefined;

    if (tagSearchResponse?.ok) {
      const tagData = await tagSearchResponse.json();
      const existingTag = tagData.tags?.find(
        (t: { tag?: string }) => t.tag?.toLowerCase() === tagName.toLowerCase()
      );
      tagId = existingTag?.id;
    }

    if (!tagId) {
      const createTagResponse = await acFetch("/tags", {
        method: "POST",
        body: JSON.stringify({
          tag: {
            tag: tagName,
            tagType: "contact",
          },
        }),
      });

      if (createTagResponse?.ok) {
        const newTagData = await createTagResponse.json();
        tagId = newTagData.tag?.id;
      }
    }

    if (!tagId) {
      console.error(`Failed to find or create tag: ${tagName}`);
      return;
    }

    await acFetch("/contactTags", {
      method: "POST",
      body: JSON.stringify({
        contactTag: {
          contact: contactId,
          tag: tagId,
        },
      }),
    });
  } catch (error) {
    console.error(`Error adding tag ${tagName}:`, error);
  }
};

export async function syncContactToActiveCampaign(
  contact: ActiveCampaignContact
): Promise<ActiveCampaignResponse> {
  const { apiUrl, apiKey, listId } = getEnvVars();

  log("Starting contact sync", { email: contact.email, hasApiUrl: !!apiUrl, hasApiKey: !!apiKey });

  if (!apiUrl || !apiKey) {
    log("ActiveCampaign not configured, skipping sync");
    return { success: false, error: "ActiveCampaign not configured" };
  }

  try {
    const fieldValues: Array<{ field: string; value: string }> = [];

    if (contact.company) {
      fieldValues.push({ field: "1", value: contact.company.trim() });
    }

    if (contact.message) {
      fieldValues.push({ field: "2", value: contact.message.trim() });
    }

    const contactPayload = {
      contact: {
        email: contact.email.trim(),
        firstName: contact.firstName.trim(),
        lastName: contact.lastName?.trim() || "",
        phone: contact.phone?.trim() || "",
        fieldValues,
      },
    };

    log("Sending contact payload", {
      email: contactPayload.contact.email,
      firstName: contactPayload.contact.firstName,
      fieldCount: fieldValues.length,
    });

    const acResponse = await acFetch("/contact/sync", {
      method: "POST",
      body: JSON.stringify(contactPayload),
    });

    if (!acResponse) {
      log("No response from ActiveCampaign API");
      return { success: false, error: "Failed to connect to ActiveCampaign" };
    }

    if (!acResponse.ok) {
      const errorData = await acResponse.text();
      log("ActiveCampaign API error", { status: acResponse.status, error: errorData });
      return { success: false, error: `API error: ${acResponse.status} - ${errorData}` };
    }

    const acData = await acResponse.json();
    const contactId = acData.contact?.id;

    if (!contactId) {
      log("No contact ID in response", { response: acData });
      return { success: false, error: "No contact ID returned" };
    }

    log("Contact synced successfully", { email: contact.email, contactId });

    // Add to list if configured
    if (listId) {
      log("Adding contact to list", { contactId, listId });
      const listResponse = await acFetch("/contactLists", {
        method: "POST",
        body: JSON.stringify({
          contactList: {
            list: listId,
            contact: contactId,
            status: 1,
          },
        }),
      });

      if (listResponse && !listResponse.ok) {
        const listError = await listResponse.text();
        log("Failed to add contact to list", { error: listError });
      } else if (listResponse) {
        log("Contact added to list successfully", { listId });
      }
    }

    // Add tags
    if (contact.tags && contact.tags.length > 0) {
      log("Adding tags to contact", { contactId, tags: contact.tags });
      for (const tag of contact.tags) {
        await addTagToContact(contactId, tag);
      }
      log("Tags added successfully", { tags: contact.tags });
    }

    return { success: true, contactId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    log("Error syncing contact", { error: errorMessage, email: contact.email });
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export function splitName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  if (!fullName) {
    return { firstName: "", lastName: "" };
  }
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");
  return { firstName, lastName };
}
