import { Link } from "react-router-dom";
import type { Booking } from "../../types/booking";
type Props = {
  bookings: Booking[];
};

function CustomerBookingsSection({ bookings }: Props) {
  if (bookings.length === 0) {
    return (
      <p className="text-center body-text py-10">You have no bookings yet.</p>
    );
  }

  return (
    <>
      {[...bookings]
        .sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        )
        .map((booking) => (
          <div
            key={booking.id}
            className="bg-primary shadow-md flex flex-col md:flex-row"
          >
            <Link to={`/venue/${booking.venue?.id}`} className="md:w-1/3">
              <img
                src={booking.venue?.media?.[0]?.url}
                alt={booking.venue?.name}
                className="w-full h-56 object-cover hover:opacity-90 transition"
              />
            </Link>

            <div className="p-6 flex-1">
              <Link to={`/venue/${booking.venue?.id}`}>
                <h2 className="text-lg font-semibold mb-2 font-serif hover:underline">
                  {booking.venue?.name}
                </h2>
              </Link>

              <p className="text-sm text-gray-600 mb-4">
                Nok {booking.venue?.price ?? 0} nightly
              </p>

              <h3 className="booking-text mb-3">Booking Details</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 body-text">
                <div>
                  <p className="font-bold text-primary-col">Check in</p>
                  <p>{new Date(booking.dateFrom).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="font-bold text-primary-col">Check out</p>
                  <p>{new Date(booking.dateTo).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="font-bold text-primary-col">Guests</p>
                  <p>{booking.guests}</p>
                </div>

                <div>
                  <p className="font-bold text-primary-col">Total</p>
                  <p>Nok {booking.guests * (booking.venue?.price ?? 0)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default CustomerBookingsSection;
