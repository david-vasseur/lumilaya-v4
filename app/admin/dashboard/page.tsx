import Link from 'next/link';

function page() {
    return (
        <div className="flex flex-col gap-14 items-center justify-center min-h-screen">
            <Link href="/admin/dashboard/order">Commandes</Link>
            <Link href="/admin/dashboard/order">Produits</Link>
            <Link href="/admin/dashboard/order">Prix</Link>
            <Link href="/admin/dashboard/order">Avis</Link>
        </div>
    )
}

export default page