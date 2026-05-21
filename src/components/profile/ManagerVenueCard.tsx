import { Link } from "react-router-dom";
import type { Venue } from "../../types/venue";

type Props = {
  venue: Venue;
};

function ManagerVenueCard({ venue }: Props) {
  return (
    <div className="bg-primary shadow-md flex flex-col h-full">
      <Link to={`/venue/${venue.id}`}>
        <img
          src={
            venue.media?.[0]?.url ||
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          }
          alt={venue.name}
          className="w-full aspect-[3/2] object-cover hover:opacity-90 transition"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-[#303437] mb-1">
          {venue.location?.city || "Unknown city"},{" "}
          {venue.location?.country || "Unknown country"}
        </p>

        <Link to={`/venue/${venue.id}`}>
          <h2 className="font-serif text-base font-semibold line-clamp-2 min-h-[56px]">
            {venue.name}
          </h2>
        </Link>

        <p className="body-text mt-1 mb-3">Nok {venue.price} nightly</p>

        <Link
          to={`/venue/${venue.id}`}
          aria-label={`View bookings for ${venue.name}`}
          className="block text-center mt-auto bg-[#303437] text-white py-2 text-sm transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
        >
          View Bookings: {venue.bookings?.length || 0}
        </Link>
      </div>
    </div>
  );
}

export default ManagerVenueCard;
