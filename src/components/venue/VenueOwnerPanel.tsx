import { Link } from "react-router-dom";
import type { Venue } from "../../types/venue";

type Props = {
  venue: Venue;
  onDelete: () => void;
  className?: string;
};

function VenueOwnerPanel({ venue, onDelete, className = "" }: Props) {
  return (
    <div className={className}>
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={onDelete}
          className="border px-4 py-2 bg-white transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          Delete Venue
        </button>

        <Link
          to={`/edit-venue/${venue.id}`}
          className="bg-[#303437] text-white px-4 py-2 transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
        >
          Edit Venue
        </Link>
      </div>

      <div className="bg-primary p-6 shadow-sm h-fit">
        <h2 className="text-xl font-serif font-semibold mb-4">
          Customer bookings
        </h2>

        {venue.bookings?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white text-left body-text">
              <thead>
                <tr className="border-b">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Check in</th>
                  <th className="p-3">Check out</th>
                  <th className="p-3">Guests</th>
                </tr>
              </thead>

              <tbody>
                {venue.bookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-b-0">
                    <td className="p-3">
                      {booking.customer?.name || "Customer"}
                    </td>

                    <td className="p-3">
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </td>

                    <td className="p-3">{booking.guests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="body-text">No bookings yet</p>
        )}
      </div>
    </div>
  );
}

export default VenueOwnerPanel;
