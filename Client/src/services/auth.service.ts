const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type LoginDto = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

function buildUrl(path: string): string {
  if (API_BASE_URL) {
    return new URL(path, API_BASE_URL).toString();
  }
  return path;
}

export async function login(dto: LoginDto, options?: { signal?: AbortSignal }): Promise<void> {
  const response = await fetch(buildUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      email: dto.email,
      password: dto.password,
      rememberMe: !!dto.rememberMe
    }),
    signal: options?.signal
  });
  if (!response.ok) {
    let message = "Login failed";
    try {
      const data = await response.json();
      if (typeof data?.error === "string" && data.error.trim().length > 0) {
        message = data.error;
      }
    } catch {
      // ignore parse errors
    }
    if (response.status === 401) {
      message = "Email or password is incorrect.";
    } else if (response.status === 404) {
      message = "Login service not found. Please restart the backend.";
    }
    throw new Error(message);
  }
}

export async function logout(options?: { signal?: AbortSignal }): Promise<void> {
  const response = await fetch(buildUrl("/api/auth/logout"), {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    credentials: "include",
    signal: options?.signal
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Logout failed: ${response.status} ${response.statusText}${body ? ` - ${body}` : ""}`
    );
  }
}

export type MeResponse = {
  authenticated: boolean;
  name?: string;
  fullName?: string;
  userId?: number;
  claims?: Array<{ Type: string; Value: string }>;
};

export async function me(options?: { signal?: AbortSignal }): Promise<MeResponse> {
  const response = await fetch(buildUrl("/api/auth/me"), {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: options?.signal
  });
  if (!response.ok) {
    // treat as unauthenticated on failure
    return { authenticated: false };
  }
  return (await response.json()) as MeResponse;
}

export const AuthService = { login, logout, me };
