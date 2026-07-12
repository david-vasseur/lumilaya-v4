"use server"

import { IEvent } from "@/schema/event";
import { ShippingStatus } from "../generated/prisma/enums";
import { IProduct } from "@/schema/product";

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

export async function createProduct(
    token: string,
    fingerprint: string,
    data: IProduct
) {
    console.log("📥 ServerAction createProduct appelée");

    console.log("📦 Données reçues :", {
        name: data.meta.name,
        collection: data.meta.collection,
        theme: data.meta.theme,
        imagesCount: data.images.length,
        variantsCount: data.variants.length,
        tagsCount: data.tags.length,
    });

    const formData = new FormData();

    const {
        images,
        ...product
    } = data;

    console.log("🧾 JSON produit avant stringify :", product);

    formData.append(
        "product",
        JSON.stringify(product)
    );

    console.log("📸 Ajout des images :", images.length);

    images.forEach(image => {
        console.log(
            "➡️ Image ajoutée :",
            image.name,
            image.type,
            image.size
        );

        formData.append(
            "images",
            image
        );
    });

    console.log("🚀 Envoi vers API produit");

    const res = await fetch(
        `http://lumilaya_service:4005/product/create`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "x-fingerprint": fingerprint
            },
            body: formData
        }
    );

    console.log("📡 Réponse API :", res.status);

    const result = await res.json();

    console.log("📦 Retour API :", result);

    return result;
}

export async function createVariant(
    token: string, 
    fingerprint: string,
	productId: number,
	data: {
		name: string;
		duration: number;
		weight: number;
		price: number;
	}
) {
	const response = await fetch(`http://lumilaya_service:4005/product/${productId}/variant`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
            'x-fingerprint': fingerprint,
            'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error || "Erreur lors de la création du variant");
	}

	return response.json();
}

export async function updateVariant(
	token: string,
	fingerprint: string,
	variantId: number,
	data: {
		name?: string;
		duration?: number;
		weight?: number;
		price?: number;
	}
) {
	const response = await fetch(
		`http://lumilaya_service:4005/product/variant/${variantId}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"x-fingerprint": fingerprint,
				"Authorization": `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		}
	);

	if (!response.ok) {
		const error = await response.json().catch(() => null);

		throw new Error(
			error?.message || "Erreur lors de la modification du variant"
		);
	}

	return response.json();
}

    export async function uploadProductImage(
        token: string,
        fingerprint: string,
        id: number,
        file: File
    ) {

        console.log("📤 uploadProductImage start", {
            productId: id,
            filename: file?.name,
            size: file?.size,
            type: file?.type,
        });


        const formData = new FormData();

        formData.append(
            "image",
            file
        );


        console.log("📦 FormData created", {
            hasFile: formData.has("image"),
        });


        console.log("🌐 Sending request to Nest", {
            url: `http://lumilaya_service:4005/product/${id}/upload-image`,
        });


        const response = await fetch(
            `http://lumilaya_service:4005/product/${id}/upload-image`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-fingerprint": fingerprint
                },
                body: formData
            }
        );


        console.log("📥 Nest response", {
            status: response.status,
            ok: response.ok,
        });


        if (!response.ok) {

            const errorText = await response.text();

            console.error("❌ Upload failed", {
                status: response.status,
                error: errorText,
            });


            throw new Error(
                errorText || "Erreur lors de l'upload de l'image"
            );
        }


        const result = await response.json();


        console.log("✅ Upload success", result);


        return result;
    }
