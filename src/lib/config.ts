/**
 * Resolves the active API base URL from the public environment variables.
 *
 * The deployment "state" (DEV / UAT / PRD) selects which endpoint to use so the
 * same build can be pointed at different backends via env config alone.
 */
type AppState = 'DEV' | 'UAT' | 'PRD';

const DEFAULT_LOCAL_API_URL = 'http://localhost:8080/api/v1';

const ENDPOINT_BY_STATE: Record<AppState, string | undefined> = {
  DEV: process.env.NEXT_PUBLIC_ENDPOINT_DEV ?? DEFAULT_LOCAL_API_URL,
  UAT: process.env.NEXT_PUBLIC_ENDPOINT_UAT ?? 'http://localhost:8080/api/v2',
  PRD: process.env.NEXT_PUBLIC_ENDPOINT_PRD ?? 'http://localhost:8080/api/v3',
};

export function getApiBaseUrl(): string {
  const state = (process.env.NEXT_PUBLIC_STATE as AppState | undefined) ?? 'DEV';

  if (!(state in ENDPOINT_BY_STATE)) {
    throw new Error(`Invalid NEXT_PUBLIC_STATE: ${state}`);
  }

  const endpoint = ENDPOINT_BY_STATE[state];
  if (!endpoint) {
    throw new Error(`No endpoint configured for state: ${state}`);
  }

  return endpoint;
}
