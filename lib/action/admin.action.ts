"use server"

import { IEvent } from "@/schema/event";
import { ShippingStatus } from "../generated/prisma/enums";

export const verifyToken = async (token: string, fingerprint: string) => {

    const response = await fetch('http://lumilaya_service:4005/auth/verify', {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json();
    console.log(data);
    

    if (data.authorized) {
        console.log("accès:", data.authorized );        
        return { success: true, message: "Accès authorisé" }
    } else {
        console.log("accès:", data.authorized );
        return { success: false, message: "Accès non authorisé" }
    }

}

export const login = async (username: string, password: string, fingerprint: string) => {

    const payload = {username, password, fingerprint}

    const response = await fetch('http://lumilaya_service:4005/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
                },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    return data;

}

export const getOrders = async (token: string, fingerprint: string) => {

    const response = await fetch('http://lumilaya_service:4005/order/all', {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();

}

export const getOneOrderById = async (token: string, fingerprint: string, id:string) => {

    const response = await fetch(`http://lumilaya_service:4005/order/${id}`, {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();

}

export const changeShippingStatus = async (token: string, fingerprint: string, id:string, status: ShippingStatus) => {

    const payload = {
        shippingStatus: status
    }

    const response = await fetch(`http://lumilaya_service:4005/order/${id}/shipping-status`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
}


export const getEvents = async (token: string, fingerprint: string) => {

    const response = await fetch('http://lumilaya_service:4005/event/all', {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();

}


export const createEvent = async (token: string, fingerprint: string, data: IEvent) => {

    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("address", data.address)
    formData.append("city", data.city)
    formData.append("postalCode", data.postalCode)
    formData.append("dateStart", data.dateStart)
    formData.append("dateEnd", data.dateEnd)
    formData.append("url", data.url)

    if (data.image) {
        formData.append("image", data.image)
    }

    const response = await fetch(`http://lumilaya_service:4005/event/create`, {
        method: "POST",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
}

export const getAllProducts = async (token: string, fingerprint: string) => {

    const response = await fetch('http://lumilaya_service:4005/product/all', {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();

}

export const getOneProductById = async (token: string, fingerprint: string, id:number) => {

    const response = await fetch(`http://lumilaya_service:4005/product/${id}`, {
        method: "GET",
        headers: {
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();

}

export const updateProduct = async (
    token: string,
    fingerprint: string,
    id: number,
    data: any
) => {
    const response = await fetch(
        `http://lumilaya_service:4005/product/${id}`,
        {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-fingerprint": fingerprint,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};