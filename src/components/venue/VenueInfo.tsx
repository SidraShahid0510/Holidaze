import { Wifi, ParkingCircle, Coffee, PawPrint, Star } from "lucide-react";
import type { Venue } from "../../types/venue";

type Props = {
  venue: Venue | null;
};

function VenueInfo({ venue }: Props) {
  const city = venue?.location?.city || "City";
  const country = venue?.location?.country || "Country";

  const hasFacilities =
    venue?.meta?.wifi ||
    venue?.meta?.parking ||
    venue?.meta?.breakfast ||
    venue?.meta?.pets;

  return (
    <div>
      <h1 className="main-heading">{venue?.name}</h1>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={
                star <= (venue?.rating || 0)
                  ? "fill-[#cea022] text-[#cea022]"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        <span className="text-sm text-gray-600">{venue?.rating || 0} / 5</span>
      </div>

      <p className="booking-text mt-2">
        {city}, {country}
      </p>

      <p className="mt-4 body-text">{venue?.description}</p>

      <div className="mt-6">
        <h2 className=" text-lg lg:text-xl font-semibold mb-3 font-serif">
          Facilities
        </h2>

        {hasFacilities ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {venue?.meta?.wifi && (
              <div className="flex items-center gap-2 bg-primary px-3 py-2">
                <Wifi size={18} />
                <span className="body-text">WiFi</span>
              </div>
            )}

            {venue?.meta?.parking && (
              <div className="flex items-center gap-2 bg-primary px-3 py-2">
                <ParkingCircle size={18} />
                <span className="body-text">Parking</span>
              </div>
            )}

            {venue?.meta?.breakfast && (
              <div className="flex items-center gap-2 bg-primary px-3 py-2">
                <Coffee size={18} />
                <span className="body-text">Breakfast</span>
              </div>
            )}

            {venue?.meta?.pets && (
              <div className="flex items-center gap-2 bg-primary px-3 py-2">
                <PawPrint size={18} />
                <span className="body-text">Pets allowed</span>
              </div>
            )}
          </div>
        ) : (
          <p className="body-text bg-primary px-4 py-3">
            No facilities have been added for this venue yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default VenueInfo;
