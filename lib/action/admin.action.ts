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