"use client"

import { generateFingerprint } from "@/utils/dbFunction";
import { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import { getEvents } from "@/lib/action/admin.action";
import EventForm from "@/components/form/admin/EventForm";

type IEvent = {
    name: string
    address: string
    city: string
    postalCode: string
    dateStart: string
    dateEnd: string
    image: File | null
    url: string
}

function Page() {

    const [events, setEvents] = useState<IEvent[]>([])
    const [dateFilter, setDateFilter] = useState<string>("ALL")

    const filteredEvents =
    dateFilter === "ALL"
        ? events
        : events.filter(e => e.dateEnd > new Date().toString())

    useEffect(() => {

        const loadEvents = async () => {

            const fingerprint = generateFingerprint();
            const token = sessionStorage.getItem('admin-token');

            if (!fingerprint || !token) return;

            try {
                const newEvents = await getEvents(token, fingerprint);
                setEvents(newEvents);
            } catch (error) {
                console.error("Error loading events", error);
            }

        };

        loadEvents();

    }, []);

    return (
        <div className="pt-24 px-6 min-h-screen bg-gray-50">
            <BackButton />    
            <EventForm />               
        </div>
    )
}

export default Page;