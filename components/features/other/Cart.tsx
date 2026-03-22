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

    const [totalwithShip, setTotalWithShip] = useState<number>(0);
    const [shippment, setShipment] = useState({name: "", price: 0});
    const { items, ship, total } = useCartStore();
    const { closeModal, isOpen } = useModalStore();
    const path = usePathname();
    
    useEffect(() => {

        if (ship.shipping) {
            setTotalWithShip(total() + ship.fee);
        } else {
            setTotalWithShip(total);
        }
        
    
    }, [ship.shipping]);

// useEffect(() => {
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
// }, [ship.shipping, ship.code, total]);
    
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
                    <ShipItem />
                )}                
            </div>
            <span className="px-6 py-3 bg-[#7A9B8E]/10 text-[#34423d] rounded-lg font-semibold shadow-2xl">Total de commande : {totalwithShip.toFixed(2)} € {!ship.shipping && "*"}</span>
            {path !== "/checkout" && isOpen  && (
                <Link 
                    href={"/checkout"}
                    onClick={() => closeModal()}
                    className="cursor-pointer flex-1 bg-[#7A9B8E] text-white py-4 rounded-lg hover:bg-[#6A8B7E] px-5 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                    Valider le panier
                </Link>
            )}
            {!ship.shipping && (
                <span className="text-sm ">* Prix Hors Livraison</span>
            )}
        </div>
    )
}

export default Cart;