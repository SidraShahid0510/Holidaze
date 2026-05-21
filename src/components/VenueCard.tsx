import type { Venue } from "../types/venue";
import { Link } from "react-router-dom";
import fallbackImage from "../assets/fallback-img.webp";
import { Star } from "lucide-react";

type VenueCardProps = {
  venue: Venue;
};

function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media?.[0]?.url || fallbackImage;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  return (
    <Link
      to={`/venue/${venue.id}`}
      className="flex h-full flex-col bg-primary shadow-md"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          width="400"
          height="225"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="flex flex-1 flex-col py-4 px-6">
        <div className="flex items-start justify-between gap-4">
          <p className="body-text leading-none">
            {venue.location?.city || "City"},{" "}
            {venue.location?.country || "Country"}
          </p>

          <div className="flex shrink-0 items-center gap-1 text-secondary-col leading-none">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  venue.rating >= star
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-yellow-500"
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="mt-2 venue-card-heading line-clamp-2 lg:min-h-0">
          {venue.name}
        </h3>
        <p className="mt-1 body-text font-normal">Nok {venue.price} nightly</p>

        <p className="mt-auto pt-5 inline-block body-text font-semibold">
          More Details
        </p>
      </div>
    </Link>
  );
}

export default VenueCard;
