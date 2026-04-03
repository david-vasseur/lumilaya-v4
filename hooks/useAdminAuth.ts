"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyToken } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";

type AuthStatus = "loading" | "unauthorized" | "authorized";

export const useAdminAuth = () => {
    const [status, setStatus] = useState<AuthStatus>("loading");
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem("admin-token");
            if (!token) {
                setStatus("unauthorized");
                return;
            }

            const fingerprint = generateFingerprint();
            if (!fingerprint) {
                setStatus("unauthorized");
                return;
            }

            try {
                const authorized = await verifyToken(token, fingerprint);
                if (authorized.success) {
                setStatus("authorized");
                toast.success(authorized.message);
                } else {
                setStatus("unauthorized");
                toast.error(authorized.message);
                }
            } catch (err) {
                console.error(err);
                setStatus("unauthorized");
                toast.error("Erreur de connexion, veuillez vous reconnecter");
            }
        };

        checkAuth();
    }, [router]);

    const handleDisconnect = () => {
        sessionStorage.removeItem("admin-token");
        setStatus("unauthorized");
        router.push("/admin");
    };

    return { status, handleDisconnect, isLogged: status === "authorized" };
};