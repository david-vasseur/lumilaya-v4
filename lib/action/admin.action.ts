"use server"

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