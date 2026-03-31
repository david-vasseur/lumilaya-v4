"use client"

import ShipStatusForm from '@/components/form/admin/ShipStatusForm';
import { getOneOrderById } from '@/lib/action/admin.action';
import { Order, OrderItem } from '@/lib/generated/prisma/client';
import { generateFingerprint } from '@/utils/dbFunction';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type OrderWithItems = Order & {
  items: OrderItem[]
}

function page() {

    const params = useParams();
    const slug = params.slug as string;

    const [order, setOrder] = useState<OrderWithItems>();

    useEffect(() => {
        const loadOrders = async () => {
        
        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem('admin-token');

        if (!fingerprint || !token || !slug) return;

        try {
            const newOrder = await getOneOrderById(token, fingerprint, slug);
            setOrder(newOrder.order);
        } catch (error) {
            console.error("Error loading orders", error);
        }

        };

        loadOrders();

    }, []);

    if (!order) {
        return (
        <div className="p-10 text-center text-gray-500">
            Chargement de la commande...
        </div>
        );
    }

    return (
        <div className="pt-20 p-10 max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold">
                Commande #{order.stripeSessionId}
            </h1>
            <p className="text-gray-500 text-sm">
                Créée le {new Date(order.createdAt).toLocaleDateString()}
            </p>
            </div>

            <ShipStatusForm status={order.shippingStatus} id={String(order.id)} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CLIENT */}
            <div className="bg-white shadow rounded-xl p-6 space-y-2">
            <h2 className="font-semibold text-lg">Client</h2>

            <p>
                {order.firstName} {order.lastName}
            </p>

            <p className="text-gray-500">{order.email}</p>

            <p className="text-gray-500">{order.phone}</p>
            </div>

            {/* TOTAL */}
            <div className="bg-white shadow rounded-xl p-6 space-y-2">
            <h2 className="font-semibold text-lg">Total</h2>

            <p className="text-2xl font-bold">
                {Number(order.total).toFixed(2)} €
            </p>

            <p className="text-gray-500">
                Livraison : {order.shippingType} ({Number(order.shippingPrice).toFixed(2)} €)
            </p>
            </div>

        </div>

        {/* SHIPPING */}
        <div className="bg-white shadow rounded-xl p-6 space-y-2">
            <h2 className="font-semibold text-lg">Adresse de livraison</h2>

            <p>{order.shippingAddress}</p>

            <p>
            {order.shippingPostalCode} {order.shippingCity}
            </p>

            <p>{order.shippingCountry}</p>
        </div>

        {/* BILLING */}
        <div className="bg-white shadow rounded-xl p-6 space-y-2">
            <h2 className="font-semibold text-lg">Adresse de facturation</h2>

            <p>{order.billingAddress}</p>

            <p>
            {order.billingPostalCode} {order.billingCity}
            </p>

            <p>{order.billingCountry}</p>
        </div>

        {/* ITEMS */}
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4">Articles</h2>

            <table className="w-full text-sm">

            <thead className="text-left border-b">
                <tr>
                <th className="py-2">Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
                </tr>
            </thead>

            <tbody>
                {order.items.map((item: any) => (
                <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.price).toFixed(2)} €</td>
                </tr>
                ))}
            </tbody>

            </table>
        </div>

        </div>
    );
}

export default page;