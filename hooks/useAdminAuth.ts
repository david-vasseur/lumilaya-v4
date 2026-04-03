"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyToken } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";

export const useAdminAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("admin-token");
        const fingerprint = generateFingerprint();

        if (!token || !fingerprint) {
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
    }, [router]);

    const handleDisconnect = () => {
        sessionStorage.removeItem("admin-token");
        router.push("/admin");
    };


    return { isLogged, handleDisconnect };
};