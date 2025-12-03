const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;
const isDev = !!import.meta.env.DEV;
const log = (...args: unknown[]) => {
    if (isDev) {
        // eslint-disable-next-line no-console
        console.log("[auth.checkAuth]", ...args);
    }
};

let inflight: Promise<boolean> | null = null;
let last: { value: boolean; at: number } | null = null;
const CACHE_MS = 3000;

export async function checkAuth(signal?: AbortSignal): Promise<boolean> {
    const now = Date.now();
    // Only cache positive (authenticated) results briefly.
    if (last && last.value === true && now - last.at < CACHE_MS) {
        log("cache hit (authed)", { cachedAtMs: last.at, ageMs: now - last.at });
        return last.value;
    }
    if (inflight) {
        log("reuse inflight request");
        return inflight;
    }
    inflight = (async () => {
        try {
            const url = API_BASE_URL
                ? new URL("/api/auth/me", API_BASE_URL).toString()
                : "/api/auth/me";
            log("request", { url });
            const res = await fetch(url, {
                method: "GET",
                headers: { Accept: "application/json" },
                credentials: "include",
                signal,
            });
            log("response", { status: res.status, ok: res.ok });
            if (!res.ok) return false;
            const data = (await res.json()) as { authenticated?: boolean };
            const value = Boolean(data?.authenticated);
            log("parsed", { authenticated: value });
            // Cache only when authenticated; when unauthenticated, force re-check next time.
            last = value ? { value, at: Date.now() } : null;
            return value;
        } catch {
            log("error while checking auth (treat as unauthenticated)");
            return false;
        } finally {
            log("done");
            inflight = null;
        }
    })();
    return inflight;
}
