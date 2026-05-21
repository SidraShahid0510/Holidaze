import type { Venue } from "../../types/venue";

type Props = {
  venue: Venue | null;
};

function VenueLocationMap({ venue }: Props) {
  return (
    <div className="max-w-7xl mx-auto mb-12 px-6 sm:px-12 lg:px-6 mt-8">
      <h2 className="text-lg lg:text-xl font-semibold mb-3 font-serif">
        Location
      </h2>

      {venue?.location?.lat !== undefined &&
      venue?.location?.lng !== undefined ? (
        <iframe
          title="Venue location map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            venue.location.lng - 0.05
          },${venue.location.lat - 0.05},${venue.location.lng + 0.05},${
            venue.location.lat + 0.05
          }&layer=mapnik&marker=${venue.location.lat},${venue.location.lng}`}
          className="w-full h-[350px] border-0"
        ></iframe>
      ) : (
        <div className="h-[200px] flex items-center justify-center bg-gray-100 text-gray-500">
          Location not available
        </div>
      )}
    </div>
  );
}

export default VenueLocationMap;
