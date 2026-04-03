"use client"

import { getOrders } from "@/lib/action/admin.action";
import { generateFingerprint } from "@/utils/dbFunction";
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface IOrder {
    id: number,
    stripeSessionId: string,
    shippingCity: string,
    shippingStatus: string,
    total: number,
    createdAt: Date,
}

function Page() {

    const { isLogged, handleDisconnect } = useAdminAuth();
    const [orders, setOrders] = useState<IOrder[]>([])
    const [statusFilter, setStatusFilter] = useState<string>("ALL")

    const filteredOrders =
    statusFilter === "ALL"
        ? orders
        : orders.filter(o => o.shippingStatus === statusFilter)

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
            {isLogged ?
                (
                    <>
                        <BackButton />  
                        <button className="rounded-2xl px-6 py-3 bg-red-400 border border-red-600" onClick={handleDisconnect}>Se deconnecter</button>  
                        <div className="max-w-5xl mx-auto space-y-4">

                            <h1 className="text-4xl text-center">Mes commandes</h1>

                            <ul className="flex gap-5 justify-center flex-wrap">
                                <li className="px-6 py-3 rounded-2xl bg-[#7A9B8E] border border-[#7A9B86] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-2xl shadow-gray-800 my-4" onClick={() => setStatusFilter("ALL")}>Toutes</li>
                                <li className="px-6 py-3 rounded-2xl bg-[#7A9B8E] border border-[#7A9B86] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-2xl shadow-gray-800 my-4" onClick={() => setStatusFilter("PENDING")}>En attente</li>
                                <li className="px-6 py-3 rounded-2xl bg-[#7A9B8E] border border-[#7A9B86] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-2xl shadow-gray-800 my-4" onClick={() => setStatusFilter("DELIVERING")}>Envoyées</li>
                                <li className="px-6 py-3 rounded-2xl bg-[#7A9B8E] border border-[#7A9B86] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-2xl shadow-gray-800 my-4" onClick={() => setStatusFilter("DELIVERED")}>Livrées</li>
                                <li className="px-6 py-3 rounded-2xl bg-[#7A9B8E] border border-[#7A9B86] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 shadow-2xl shadow-gray-800 my-4" onClick={() => setStatusFilter("CANCELLED")}>Annulées</li>
                            </ul>

                            {filteredOrders.map((order) => (

                            <Link
                                key={order.id}
                                href={`/admin/dashboard/order/${order.id}`}
                                className={`block ${order.shippingStatus === "CANCELLED" ? "opacity-50" : ""} overflow-hidden my-10`}
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
                    </>
                ) : (
                    <div className="max-w-5xl mx-auto pt-20">
                        <h1>Accès non authorisé</h1>
                    </div>
                )            
            }   
        </div>
    )
}

export default Page;