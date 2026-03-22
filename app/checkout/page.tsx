"use client"

import Cart from "@/components/features/other/Cart";
import { CheckoutForm } from "@/components/form/CheckoutForm";


function page() {
    return (
        <div className="min-h-screen pt-14 flex flex-col lg:flex-row">
            <div className="py-5 sticky bg-[#FDFBF7] border-b-2 lg:border-b-0 z-5 top-14 w-full max-h-[25vh] overflow-y-scroll lg:max-h-auto lg:w-1/3 max-w-7xl border-r border-gray-500/60 text-gray-800 h-screen">
                <Cart />
            </div>
            <div className="relative z-0 pt-5 lg:flex-2">
                <CheckoutForm />
            </div>            
        </div>
    )
}

export default page