import { MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export interface EventCardProps {
  id: number
  name: string
  dateStart: string
  dateEnd: string
  city: string
  postalCode: string
  image: string
  url: string
}

function EventCard({
  name,
  dateStart,
  dateEnd,
  city,
  postalCode,
  image,
  url
}: EventCardProps) {

  const start = new Date(dateStart)
  const end = new Date(dateEnd)

  const formattedDate =
    start.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }) +
    (start.getTime() !== end.getTime()
      ? ` - ${end.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long"
        })}`
      : "")

  const content = (
    <div className="event-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">

      <div className="relative w-full h-48">
        <img
          src={image}
          alt={name}
          className="absolute w-full h-full object-cover object-top"
        />
      </div>

      <div className="p-6">

        <div className="flex items-center gap-2 text-sm text-[#7A9B8E] mb-2">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </div>

        <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-[#2C2C2C]/70">
          <MapPin className="w-4 h-4" />
          {city} ({postalCode})
        </div>

      </div>
    </div>
  )

  if (url === "#") {
    return content
  }

  return (
    <Link href={url}>
      {content}
    </Link>
  )
}

export default EventCard;