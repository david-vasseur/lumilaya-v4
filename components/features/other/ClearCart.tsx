"use client"

import { useCartStore } from '@/lib/store/cartStore'
import React, { useEffect } from 'react'

function ClearCart() {

    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return null;
   
}

export default ClearCart;