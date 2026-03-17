import { MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  date: string
  city: string
  place: string
  image: string
  url: string
}

function EventCard({ date, city, place, image, url }: EventCardProps) {
    return (
        <Link href={url} className="event-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img
                src={image}
                alt={place}
                className="w-full h-48 object-cover object-top"
            />
            <div className="p-6">

                <div className="flex items-center gap-2 text-sm text-[#7A9B8E] mb-2">
                <Calendar className="w-4 h-4" />
                {date}
                </div>

                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
                {place}
                </h3>

                <div className="flex items-center gap-2 text-[#2C2C2C]/70">
                <MapPin className="w-4 h-4" />
                {city}
                </div>

            </div>

        </Link>
    )
}

export default EventCard;