"use client"

import { verifyToken } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useAdminAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState<string | null>(null); // <-- nouveau state
    const router = useRouter();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("admin-token");
        setToken(storedToken);
    }, []);

    useEffect(() => {
        if (!token) {
            router.push("/admin");
            return;
        }

        const fingerprint = generateFingerprint();
        if (!fingerprint) {
            router.push("/admin");
            return;
        }

        const authorizedLoader = async () => {
            try {
                const authorized = await verifyToken(token, fingerprint);
                if (authorized.success) {
                    setIsLogged(true);
                    toast.success(authorized.message);
                } else {
                    toast.error(authorized.message);
                    router.push("/admin");
                }
            } catch (error) {
                console.error(error);
                router.push("/admin");
            }
        };

        authorizedLoader();
    }, [token, router]); // <-- dépendance sur token

    const handleDisconnect = () => {
        sessionStorage.removeItem("admin-token");
        setToken(null); // <-- reset token
        router.push("/admin");
    };

    const loginSuccess = (newToken: string) => {
        sessionStorage.setItem("admin-token", newToken);
        setToken(newToken); // <-- update hook state
    };

    return { isLogged, handleDisconnect, loginSuccess };
};