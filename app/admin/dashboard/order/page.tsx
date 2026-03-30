"use client"

import { getOrders } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/generated/prisma/client";



function Page() {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {

        const loadOrders = async () => {

        const fingerprint = generateFingerprint();
        const token = sessionStorage.getItem('admin-token');

        if (!fingerprint || !token) return;

        try {
            const newOrders = await getOrders(token, fingerprint);
            setOrders(newOrders);
        } catch (error) {
            console.error("Error loading orders", error);
        }

        };

        loadOrders();

    }, []);

    return (
        <div className="pt-24 px-6 min-h-screen bg-gray-50">        
            <div className="max-w-5xl mx-auto space-y-4">

                {orders.map((order) => (

                <Link
                    key={order.id}
                    href={`/admin/dashboard/order/${order.id}`}
                    className={`block ${order.shippingStatus === "CANCELLED" ? "opacity-50" : ""}`}
                >
                    
                    <div className={`${order.shippingStatus === "CANCELLED" ? "bg-red-500" : order.shippingStatus === "DELIVERED" ? "bg-green-500" : "bg-zinc-300"} rounded-xl border hover:shadow-md transition p-5 cursor-pointer`}>

                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-lg">
                            Commande #{order.stripeSessionId}
                        </h2>

                        <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                        <div>
                            <p className="text-gray-500">Total</p>
                            <p className="font-semibold">{Number(order.total)} €</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Status</p>
                            <p className="font-semibold">{
                                order.shippingStatus === "PENDING" ? "En attente de livraison" : 
                                order.shippingStatus === "DELIVERING" ? "En cours de livraison" : 
                                order.shippingStatus === "CANCELLED" ? "Commande annulée" : 
                                order.shippingStatus === "DELIVERED" ? "Livrée" : "Commande envoyée"
                                }</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Ville</p>
                            <p className="font-semibold">{order.shippingCity}</p>
                        </div>

                    </div>

                    </div>

                </Link>

                ))}

                {orders.length === 0 && (
                <p className="text-center text-gray-500">
                    Aucune commande
                </p>
                )}

            </div>
        </div>
    )
}

export default Page;