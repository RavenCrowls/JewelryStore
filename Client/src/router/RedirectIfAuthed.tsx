import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./auth";

type RedirectIfAuthedProps = { children: React.ReactElement };

export default function RedirectIfAuthed({ children }: RedirectIfAuthedProps) {
    const [authState, setAuthState] = React.useState<"checking" | "authed" | "unauth">("checking");
    React.useEffect(() => {
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.log("[RedirectIfAuthed] mount");
        }
        let isMounted = true;
        checkAuth().then((ok) => {
            if (import.meta.env.DEV) {
                // eslint-disable-next-line no-console
                console.log("[RedirectIfAuthed] result", { ok });
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
    if (authState === "authed") {
        if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.log("[RedirectIfAuthed] redirect to /manager");
        }
        return <Navigate to="/manager" replace />;
    }
    return children;
}
