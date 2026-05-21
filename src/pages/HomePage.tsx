import heroImage from "../assets/hero-image.webp";
import BookingBar from "../components/BookingBar";
import VenueCard from "../components/VenueCard";
import deal1 from "../assets/deal-1.jpg";
import deal2 from "../assets/deal-2.jpg";
import DealCard from "../components/DealCard";
import BestStaysSlider from "../components/BestStaysSlider";
import ExperienceCard from "../components/ExperienceCard";
import exp1 from "../assets/image-3.jpg";
import exp2 from "../assets/imag-4.jpg";
import exp3 from "../assets/image-5.jpg";
import { useEffect, useState } from "react";
import { getVenues } from "../services/venue";
import type { Venue } from "../types/venue";
function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchGuests, setSearchGuests] = useState(0);
  const [searchCheckIn, setSearchCheckIn] = useState("");
  const [searchCheckOut, setSearchCheckOut] = useState("");
  useEffect(() => {
    document.title = "Holidaze | Home";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse and book beautiful venues around the world with Holidaze.",
      );
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    let ignore = false;

    async function fetchVenues() {
      if (!hasMore) return;

      setIsFetching(true);

      try {
        const limit = searchLocation ? 50 : 9;

        const response = await getVenues(limit, page);
        const newVenues = response.data;

        if (ignore) return;

        setVenues((prev) => {
          const existingIds = new Set(prev.map((venue) => venue.id));

          const uniqueVenues = newVenues.filter(
            (venue: Venue) => !existingIds.has(venue.id),
          );

          return [...prev, ...uniqueVenues];
        });

        if (newVenues.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch venues", error);
      } finally {
        if (!ignore) {
          setLoading(false);
          setIsFetching(false);
        }
      }
    }

    fetchVenues();

    return () => {
      ignore = true;
    };
  }, [page, searchLocation, searchGuests, searchCheckIn, searchCheckOut]);

  const filteredVenues = venues.filter((venue) => {
    const search = searchLocation.toLowerCase().trim();

    const city = venue.location?.city?.toLowerCase() || "";
    const country = venue.location?.country?.toLowerCase() || "";
    const name = venue.name?.toLowerCase() || "";

    const matchesLocation =
      search === "" ||
      city.includes(search) ||
      country.includes(search) ||
      name.includes(search);

    const matchesGuests = searchGuests === 0 || venue.maxGuests >= searchGuests;

    const matchesDates =
      !searchCheckIn ||
      !searchCheckOut ||
      !venue.bookings?.some((booking) => {
        const searchStart = new Date(searchCheckIn);
        const searchEnd = new Date(searchCheckOut);
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);

        return searchStart < bookingEnd && searchEnd > bookingStart;
      });

    return matchesLocation && matchesGuests && matchesDates;
  });
  function handleSearch(
    location: string,
    guests: number,
    checkIn: string,
    checkOut: string,
  ) {
    setVenues([]);
    setPage(1);
    setHasMore(true);

    setSearchLocation(location);
    setSearchGuests(guests);
    setSearchCheckIn(checkIn);
    setSearchCheckOut(checkOut);
  }
  return (
    <section className="w-full scroll-mt-24" id="home">
      {/* Hero + booking wrapper */}
      <div className="relative">
        {/* Hero image */}
        <div className="relative w-full overflow-visible">
          <div className="aspect-[16/9] max-h-[70vh] w-full">
            <img
              src={heroImage}
              alt="Luxury hotel room"
              width="1600"
              height="900"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          {/* white overlay */}
          <div className="absolute inset-0 bg-white/20" />

          {/* Hero text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="hero-heading">Where Elegance Feels Like Home</h1>
          </div>
        </div>

        {/* Beige section under hero */}
        <div className="bg-primary py-10 md:py-14">
          <div className="w-full max-w-6xl mx-auto px-4">
            <BookingBar onSearch={handleSearch} clearAfterSearch />
          </div>
        </div>
      </div>
      {/*venue card section*/}
      <section
        className="bg-white px-6 py-12 md:px-10 lg:px-16 scroll-mt-24"
        id="venues"
      >
        {/* Header */}
        <div className="mb-4 md:mb-6 lg:mb-8 flex items-center justify-between">
          <h2 className="main-heading">Venues</h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading || isFetching ? (
            // Skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-primary shadow-md animate-pulse">
                <div className="aspect-[16/9] bg-gray-300 w-full"></div>

                <div className="py-4 px-6 space-y-3">
                  <div className="h-3 bg-gray-300 w-1/3"></div>
                  <div className="h-4 bg-gray-300 w-2/3"></div>
                  <div className="h-3 bg-gray-300 w-1/2"></div>
                </div>
              </div>
            ))
          ) : isFetching ? (
            <p className="body-text col-span-full text-center py-10">
              Searching venues...
            </p>
          ) : filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))
          ) : (
            <p className="body-text col-span-full text-center py-10">
              No venues found.
            </p>
          )}
        </div>
        <div className="flex justify-center mt-10">
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isFetching}
                className="border border-[#cea022] px-6 py-2 body-text transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>
      {/*deals section*/}
      <section className="bg-white px-4 pb-10 sm:px-6 md:px-10 lg:px-16 lg:pb-16">
        <h2 className="main-heading mb-4 md:mb-6 lg:mb-8">Get Latest Deals</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <DealCard
            image={deal1}
            title="Exclusive Deals on Cozy Hotels"
            tag="Valid only 17 April-30 April"
          />

          <DealCard
            image={deal2}
            title="Limited-Time Offers on Premium Stays"
            tag="Valid only 15 April-25 April"
          />
        </div>
      </section>

      {/*best stays slider*/}
      <BestStaysSlider />

      {/*experience section*/}

      <section className="bg-primary px-6 pb-12 md:px-10 lg:px-16">
        <div className="mx-auto py-10 ">
          <h2 className="main-heading text-center">A Considered Experience</h2>

          <p className="mx-auto mt-4 max-w-3xl text-center body-text">
            Every journey deserves more than just a place to stay. At Holidaze,
            we focus on creating thoughtful experiences that feel effortless
            from start to finish. From carefully selected spaces to seamless
            booking, every detail is designed to give you comfort, clarity, and
            a sense of belonging wherever you go.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ExperienceCard
              image={exp1}
              text="Your stay begins with a feeling, we help you find the right one."
            />
            <ExperienceCard
              image={exp2}
              text="Spaces chosen with care, so you can stay without compromise."
            />
            <ExperienceCard
              image={exp3}
              text="Every detail considered, so your experience feels effortless."
            />
          </div>
        </div>
      </section>
    </section>
  );
}

export default HomePage;
