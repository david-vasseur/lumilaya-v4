"use client"

import LoginForm from '@/components/form/LoginForm';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function page() {

    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {

        if (sessionStorage.getItem("admin-token")) {
            setIsLogged(true);
            
        }

    }, [])

    return (
        <div className="flex flex-col gap-14 items-center justify-center min-h-screen">
            {!isLogged ? (
                <LoginForm />
            ) : (
                <>
                    <h1 className="text-4xl text-red-700">Bienvenue</h1>
                    <Link className="px-6 py-3 rounded-2xl border bg-gray-500" href={"/admin/dashboard"}>Aller au dashboard</Link>
                </>
            )}
            
        </div>
    )
}

export default page;