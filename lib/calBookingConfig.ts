export type QuestionType =
  | "text"
  | "email"
  | "url"
  | "select"
  | "multiselect"
  | "textarea";

export type BookingQuestion = {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export type MeetingTypeConfig = {
  slug: string;
  calEventTypeSlug: string; // The actual slug in Cal.com
  title: string;
  description: string;
  durationMinutes: number;
  hostUsername: string;
  eventTypeId?: number;
  questions: BookingQuestion[];
};

export const meetingTypes: MeetingTypeConfig[] = [
  {
    slug: "ai-video-discovery",
    calEventTypeSlug: "30min",
    title: "AI Video Production Discovery",
    description:
      "Explore Guided Video production options and scope the best path forward.",
    durationMinutes: 30,
    hostUsername: "wolfkrammel",
    questions: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "company", label: "Company Name", type: "text", required: true },
      { id: "website", label: "Company Website", type: "url" },
      {
        id: "video_interest",
        label: "What type of videos are you interested in?",
        type: "select",
        required: true,
        options: [
          "Training Videos",
          "Explainer Videos",
          "Sales Videos",
          "Not Sure Yet",
        ],
      },
      {
        id: "video_volume",
        label: "How many videos do you estimate needing?",
        type: "select",
        required: true,
        options: ["1-5", "6-15", "16-50", "50+", "Ongoing/Subscription"],
      },
      {
        id: "project_driver",
        label: "What's driving this project?",
        type: "textarea",
        required: true,
        placeholder: "Tell us about the problem you're trying to solve...",
      },
      {
        id: "timeline",
        label: "Timeline",
        type: "select",
        options: ["ASAP", "1-3 months", "3-6 months", "Just exploring"],
      },
    ],
  },
  {
    slug: "nextjs-discovery",
    calEventTypeSlug: "30min",
    title: "Next.js Development Discovery",
    description: "Discuss modern web development or hub builds.",
    durationMinutes: 30,
    hostUsername: "wolfkrammel",
    questions: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "company", label: "Company Name", type: "text", required: true },
      { id: "website", label: "Company Website", type: "url" },
      {
        id: "build_goal",
        label: "What are you looking to build?",
        type: "select",
        required: true,
        options: [
          "New Website",
          "Website Rebuild",
          "Training Portal/Hub",
          "Custom Web Application",
          "Not Sure Yet",
        ],
      },
      {
        id: "current_platform",
        label: "Current platform (if applicable)",
        type: "select",
        options: ["WordPress", "Squarespace", "Wix", "Custom Built", "None/New", "Other"],
      },
      {
        id: "current_issue",
        label: "What's the main problem with your current setup?",
        type: "textarea",
        required: true,
      },
      {
        id: "timeline",
        label: "Timeline",
        type: "select",
        options: ["ASAP", "1-3 months", "3-6 months", "Just exploring"],
      },
    ],
  },
  {
    slug: "strategy-session",
    calEventTypeSlug: "30min",
    title: "Free Strategy Session",
    description: "General AI transformation / business empowerment discussion.",
    durationMinutes: 30,
    hostUsername: "wolfkrammel",
    questions: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "company", label: "Company Name", type: "text", required: true },
      { id: "job_title", label: "Job Title", type: "text", required: true },
      { id: "website", label: "Company Website", type: "url" },
      {
        id: "challenge",
        label: "What's your biggest content or training challenge?",
        type: "textarea",
        required: true,
      },
      {
        id: "ai_interest",
        label: "What interests you most about AI for your business?",
        type: "multiselect",
        required: true,
        options: [
          "Video Production",
          "Training Infrastructure",
          "Content Operations",
          "AI Search Visibility",
          "General AI Strategy",
        ],
      },
      {
        id: "company_size",
        label: "Company Size",
        type: "select",
        required: true,
        options: ["1-10", "11-50", "51-200", "201-500", "500+"],
      },
      {
        id: "revenue",
        label: "Annual Revenue Range",
        type: "select",
        options: [
          "Under $2M",
          "$2M-$10M",
          "$10M-$50M",
          "$50M-$250M",
          "$250M+",
        ],
      },
    ],
  },
  {
    slug: "coffee-wolf",
    calEventTypeSlug: "15min",
    title: "Virtual Coffee with Wolf",
    description: "Informal conversation, existing relationships, networking.",
    durationMinutes: 15,
    hostUsername: "wolfkrammel",
    questions: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "organization", label: "Company/Organization", type: "text" },
      {
        id: "conversation_focus",
        label: "What would you like to chat about?",
        type: "textarea",
        placeholder:
          "No agenda required — just let me know if there's something specific...",
      },
    ],
  },
  {
    slug: "coffee-mark",
    calEventTypeSlug: "15min",
    title: "Virtual Coffee with Mark",
    description: "Informal conversation, existing relationships, networking.",
    durationMinutes: 15,
    hostUsername: "mark314",
    questions: [
      { id: "name", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "organization", label: "Company/Organization", type: "text" },
      {
        id: "conversation_focus",
        label: "What would you like to chat about?",
        type: "textarea",
        placeholder:
          "No agenda required — just let me know if there's something specific...",
      },
    ],
  },
];

export const getMeetingType = (slug: string) =>
  meetingTypes.find((type) => type.slug === slug);
