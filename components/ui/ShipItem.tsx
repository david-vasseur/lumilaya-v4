"use client"

import { useCartStore } from "@/lib/store/cartStore";

function ShipItem() {

    const { ship }= useCartStore();

    return (
        <div className="grid grid-cols-[60%_10%_15%_15%] items-center justify-between py-4 border-b border-zinc-400">
            
            <div className="flex gap-5 items-center pl-2">
                <img
                src={"/images/products/livraison.png"}
                width={40} 
                height={40} 
                alt='image produit' 
                className="rounded-lg"
            />
                <p>{ship.code === "REL" ? "Livraison en point relais" : ship.code === "OFF" ? "Livraison offerte" : "Livraison à domicile"}</p>
            </div>   
            <div className="flex items-center justify-center">
                1
            </div>         
            <span className="flex items-center justify-center">{ship.fee} €</span>       
        </div>
    )
}

export default ShipItem;