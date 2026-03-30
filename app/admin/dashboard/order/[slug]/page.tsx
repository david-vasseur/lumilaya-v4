"use client"

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

function page() {

    const params = useParams()
    const slug = params.slug

    useEffect(() => {

    },[])

    return (
        <div>page</div>
    )
}

export default page;