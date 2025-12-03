import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

async function isAuthenticated(signal?: AbortSignal): Promise<boolean> {
    try {
        let url: string;
        if (API_BASE_URL) {
            url = new URL("/api/auth/me", API_BASE_URL).toString();
        } else {
            url = "/api/auth/me";
        }
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            signal,
        });
        if (!res.ok) return false;
        const data = (await res.json()) as { authenticated?: boolean };
        return Boolean(data?.authenticated);
    } catch {
        return false;
    }
}

type RequireAuthProps = { children: React.ReactElement };

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const [authState, setAuthState] = React.useState<"checking" | "authed" | "unauth">("checking");

    React.useEffect(() => {
        const controller = new AbortController();
        isAuthenticated(controller.signal).then((ok) => {
            setAuthState(ok ? "authed" : "unauth");
        });
        return () => controller.abort();
    }, []);

    if (authState === "checking") {
        return null;
    }
    if (authState === "unauth") {
        return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
    }
    return children;
}
