"use client"

import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";
import { useModalStore } from "@/lib/store/modalStore";
import { usePathname } from "next/navigation";
// import { TotalProduct } from "../actions/product.action";
import { useEffect, useState } from "react";
// import { AddShippingPrice } from "./form/CheckOut.action";
import CartItem from "@/components/ui/CarItem";
import ShipItem from "@/components/ui/ShipItem";

function Cart() {

    const [total, setTotal] = useState<number>(0);
    const [shippment, setShipment] = useState({name: "", price: 0});
    const { items, ship, } = useCartStore();
    const { closeModal, isOpen } = useModalStore();
    const path = usePathname();
    
   useEffect(() => {
    const fetchTotal = async () => {
        const serverItems = items.map(item => ({
            productId: item.productId,
            variantId: item.id,
            name: item.name,
            qty: item.qty
        }));

        // const result = await TotalProduct(serverItems);
        // setTotal(result);
    };

    if (items.length > 0) {
        fetchTotal();
    } else {
        setTotal(0);
    }
}, [items]);

useEffect(() => {
    // const fetchShipping = async () => {
    //     const result = await AddShippingPrice(ship.code, total);

    //     setShipment({
    //         name: result.shipping?.name ?? "Livraison Offerte",
    //         price: result.shipping?.price ?? 0
    //     });
    // };

    // évite les appels inutiles ou invalides
    // if (ship.shipping && ship.code && total > 0) {
    //     fetchShipping();
    // }
}, [ship.shipping, ship.code, total]);
    
    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="hidden lg:inline-flex items-center gap-2 bg-[#7A9B8E]/10 px-4 py-2 rounded-full mb-4">
                        <span className="text-sm font-medium text-[#7A9B8E]">Récapitulatif de ma commande</span>
                    </div>
            <div className="w-full flex flex-col gap-5">
                <div className="grid grid-cols-[60%_10%_15%_15%] py-4 border-b border-zinc-400">
                
                    <p className="flex items-center justify-center text-gray-800/50">Produit</p>
                          
                    <span className="flex items-center justify-center text-gray-800/50">Qté</span>
                   
                    <span className="flex items-center justify-center text-gray-800/50">Prix €</span>
                    <span></span>
                </div>
                {items.map((item, index) => (
                    <CartItem key={index} id={item.id} name={item.name} image={item.image} price={Number((item.price * item.qty).toFixed(2))} qty={item.qty} />
                ))}
                {ship.shipping && (
                    <ShipItem name={shippment.name} price={shippment.price}  />
                )}                
            </div>
            <span className="px-6 py-3 bg-[#7A9B8E]/10 text-[#34423d] rounded-lg font-semibold shadow-2xl">Total de commande : {ship.shipping ? (shippment.price + total).toFixed(2) : total.toFixed(2)} € *</span>
            {path !== "/checkout" && isOpen  && (
                <Link 
                    href={"/checkout"}
                    onClick={() => closeModal()}
                    className="cursor-pointer flex-1 bg-[#7A9B8E] text-white py-4 rounded-lg hover:bg-[#6A8B7E] px-5 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                    Valider le panier
                </Link>
            )}
            <span className="text-red-400 text-sm">* Prix hors livraison</span>
        </div>
    )
}

export default Cart;