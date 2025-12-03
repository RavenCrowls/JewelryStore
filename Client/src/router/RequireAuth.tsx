import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "./auth";

type RequireAuthProps = { children: React.ReactElement };

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const [authState, setAuthState] = React.useState<"checking" | "authed" | "unauth">("checking");

    React.useEffect(() => {
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.log("[RequireAuth] mount at", location.pathname);
        }
        let isMounted = true;
        checkAuth().then((ok) => {
            if (import.meta.env.DEV) {
                // eslint-disable-next-line no-console
                console.log("[RequireAuth] result", { ok, from: location.pathname });
            }
            if (isMounted) {
                setAuthState(ok ? "authed" : "unauth");
            }
        });
        return () => {
            isMounted = false;
        };
    }, []);

    if (authState === "checking") {
        return null;
    }
    if (authState === "unauth") {
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.log("[RequireAuth] redirect to /login from", location.pathname);
        }
        return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
    }
    return children;
}
