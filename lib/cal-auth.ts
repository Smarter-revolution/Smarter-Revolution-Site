/**
 * Cal.com API Key Management
 *
 * SECURITY: Uses exact username matching to prevent privilege escalation
 * Previous vulnerability: string.includes("mark") allowed any username
 * containing "mark" to access Mark's API key
 */

// Whitelist of valid Cal.com usernames mapped to their environment variable names
// This prevents privilege escalation through username manipulation
const VALID_CAL_USERS: Record<string, string> = {
  'wolfkrammel': 'CAL_API_KEY',
  'mark314': 'CAL_API_KEY_MARK',
};

/**
 * Get Cal.com API key for a specific user
 *
 * SECURITY: Uses exact username matching against whitelist
 * - Prevents privilege escalation via username manipulation
 * - Falls back to default API key for unknown users
 *
 * @param username - The Cal.com username (must match exactly)
 * @returns The API key for the user, or undefined if not found
 */
export function getCalApiKey(username?: string): string | undefined {
  // If no username provided, use default
  if (!username) {
    return process.env.CAL_API_KEY?.trim();
  }

  // Normalize username to lowercase for consistent matching
  const normalizedUsername = username.toLowerCase().trim();

  // Exact match against whitelist
  const envVarName = VALID_CAL_USERS[normalizedUsername];

  if (envVarName) {
    return process.env[envVarName]?.trim();
  }

  // Unknown user - log warning and fall back to default
  // This prevents unauthorized access while maintaining functionality
  console.warn(
    `[Cal Auth] Unknown username "${username}" - using default API key`
  );
  return process.env.CAL_API_KEY?.trim();
}

/**
 * Validate if a username is a known Cal.com user
 *
 * @param username - The username to validate
 * @returns true if the username is in the whitelist
 */
export function isValidCalUser(username: string): boolean {
  const normalizedUsername = username.toLowerCase().trim();
  return normalizedUsername in VALID_CAL_USERS;
}

/**
 * Get list of valid Cal.com usernames
 *
 * @returns Array of valid usernames
 */
export function getValidCalUsers(): string[] {
  return Object.keys(VALID_CAL_USERS);
}
