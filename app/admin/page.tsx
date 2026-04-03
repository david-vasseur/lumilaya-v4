"use client"

import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function Page() {

    const { handleDisconnect } = useAdminAuth();

    return (
        <div className="flex flex-col gap-14 items-center justify-center min-h-screen">
            <h1 className="text-4xl">Bienvenue</h1>

            <Link
                className="px-6 py-3 rounded-2xl border bg-gray-500"
                href="/admin/dashboard"
            >
                Aller au dashboard
            </Link>

            <button
                className="rounded-2xl px-6 py-3 bg-red-400 border border-red-600"
                onClick={handleDisconnect}
            >
                Se déconnecter
            </button>
        </div>
    );
}