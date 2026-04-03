"use client"

import { useAdminAuth } from "@/hooks/useAdminAuth";
import LoginForm from "@/components/form/LoginForm";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status } = useAdminAuth();
    const router = useRouter();

    if (status === "loading") {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <h1>Chargement…</h1>
        </div>
        );
    }

    if (status === "unauthorized") {
        router.push('/admin')
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoginForm />
            </div>
        );
    }

    return children;
}