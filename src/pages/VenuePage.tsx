import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById, deleteVenue } from "../services/venue";
import toast from "react-hot-toast";
import type { Venue } from "../types/venue";
import { type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { createBooking } from "../services/booking";
import fallbackImage from "../assets/caro-3.jpg";
import BookingConfirmModal from "../components/venue/BookingConfirmModal";
import VenueOwnerPanel from "../components/venue/VenueOwnerPanel";
import VenueInfo from "../components/venue/VenueInfo";
import VenueLocationMap from "../components/venue/VenueLocationMap";
import BookingPanel from "../components/venue/BookingPanel";
import VenuePageSkeleton from "../components/venue/VenuePageSkeleton";
function VenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showGuestPanel, setShowGuestPanel] = useState(false);
  const totalGuests = adults + children;
  const guestText =
    totalGuests === 0
      ? "Select guests"
      : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    if (!venue) return;

    document.title = `${venue.name} | Holidaze`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        venue.description || "View venue details on Holidaze.",
      );
    }
  }, [venue]);
  useEffect(() => {
    async function loadVenue() {
      if (!id) return;

      try {
        const data = await getVenueById(id);
        setVenue(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load venue");
      } finally {
        setLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (loading) {
    return <VenuePageSkeleton />;
  }
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const totalPrice = nights > 0 && venue ? nights * venue.price : 0;

  const bookedRanges =
    venue?.bookings?.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })) || [];

  function handleBooking() {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.error("Please login to book");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedCheckIn = new Date(checkIn);

    if (selectedCheckIn < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error("Check-out must be after check-in");
      return;
    }

    const isOverlapping = venue?.bookings?.some((booking) => {
      const selectedStart = new Date(checkIn);
      const selectedEnd = new Date(checkOut);
      const bookedStart = new Date(booking.dateFrom);
      const bookedEnd = new Date(booking.dateTo);

      return selectedStart < bookedEnd && selectedEnd > bookedStart;
    });

    if (isOverlapping) {
      toast.error("These dates are already booked");
      return;
    }

    if (totalGuests === 0) {
      toast.error("Please select at least one guest");
      return;
    }

    setShowConfirmModal(true);
  }
  async function handleDeleteVenue() {
    if (!venue) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?",
    );

    if (!confirmDelete) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const loggedInUser = JSON.parse(storedUser);

    try {
      await deleteVenue(venue.id, loggedInUser.accessToken);
      toast.success("Venue deleted successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete venue");
    }
  }

  const venueImage = venue?.media?.[0]?.url || fallbackImage;

  const venueImageAlt = venue?.media?.[0]?.alt || venue?.name || "Venue image";
  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

  const isVenueOwner = loggedInUser?.name === venue?.owner?.name;

  return (
    <div className="w-full">
      <div className=" aspect-[16/9] max-h-[60vh] w-full ">
        <img
          src={venueImage}
          alt={venueImageAlt}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="w-full h-full object-cover"
        />
      </div>
      {isVenueOwner && venue && (
        <VenueOwnerPanel
          venue={venue}
          onDelete={handleDeleteVenue}
          className="mt-4 px-6 lg:hidden"
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.25fr] gap-10 mt-8 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-6">
        <VenueInfo venue={venue} />

        {isVenueOwner && venue ? (
          <VenueOwnerPanel
            venue={venue}
            onDelete={handleDeleteVenue}
            className="hidden lg:block"
          />
        ) : (
          <BookingPanel
            venuePrice={venue?.price || 0}
            maxGuests={venue?.maxGuests || 0}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={children}
            totalGuests={totalGuests}
            guestText={guestText}
            nights={nights}
            totalPrice={totalPrice}
            showCalendar={showCalendar}
            showGuestPanel={showGuestPanel}
            selectedRange={selectedRange}
            bookedRanges={bookedRanges}
            onToggleCalendar={() => setShowCalendar(!showCalendar)}
            onToggleGuestPanel={() => setShowGuestPanel(!showGuestPanel)}
            onSelectRange={(range) => {
              setSelectedRange(range);

              if (!range?.from) {
                setCheckIn("");
                setCheckOut("");
                return;
              }

              setCheckIn(range.from.toISOString().split("T")[0]);

              if (range.to && range.to.getTime() !== range.from.getTime()) {
                setCheckOut(range.to.toISOString().split("T")[0]);
              } else {
                setCheckOut("");
              }
            }}
            setAdults={setAdults}
            setChildren={setChildren}
            onBook={handleBooking}
          />
        )}
      </div>

      <VenueLocationMap venue={venue} />
      <BookingConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          if (!venue) return;

          try {
            await createBooking({
              dateFrom: checkIn,
              dateTo: checkOut,
              guests: totalGuests,
              venueId: venue.id,
            });

            setShowConfirmModal(false);
            toast.success("Booking confirmed successfully!");
            navigate("/profile");
          } catch {
            toast.error("Booking failed. Please try again.");
          }
        }}
        checkIn={checkIn}
        checkOut={checkOut}
        totalGuests={totalGuests}
        nights={nights}
        price={venue?.price || 0}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default VenuePage;
