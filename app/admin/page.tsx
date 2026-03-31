"use client"

import LoginForm from '@/components/form/LoginForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function page() {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        if (sessionStorage.getItem("admin-token")) {
            setIsLogged(true);
            
        }

    }, [])

    const handleDisconnect = () => {
        sessionStorage.removeItem("admin-token");
        router.push('/admin')
    }

    return (
        <div className="flex flex-col gap-14 items-center justify-center min-h-screen">
            {!isLogged ? (
                <LoginForm />
            ) : (
                <>
                    <h1 className="text-4xl">Bienvenue</h1>
                    <Link className="px-6 py-3 rounded-2xl border bg-gray-500" href={"/admin/dashboard"}>Aller au dashboard</Link>
                    <button className="rounded-2xl px-6 py-3 bg-red-400 border border-red-600" onClick={handleDisconnect}>Se deconnecter</button>
                </>
            )}
            
        </div>
    )
}

export default page;