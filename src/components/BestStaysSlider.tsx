import { useEffect, useRef, useState } from "react";
import { getVenueById } from "../services/venue";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import type { Venue } from "../types/venue";
import { Link } from "react-router-dom";

const sliderVenueIds = [
  "ecfc55f6-b118-4d86-a586-1cf92ce3a0d3",
  "05fbe993-9143-4590-ab75-4e8fa048578f",
  "42ce2989-bab5-4e58-81d4-4f264224f260",
  "1b181bf4-0fca-4b40-85fa-573e437504da",
  "3288eee4-a706-421d-baba-60eda5844515",
  "f8e5cb86-0241-4d98-8962-d5a171b3fab0",
  "0919e50f-3082-440b-896a-094bd8398f64",
  "c378cde2-545f-4139-baff-17fbf1905502",
];

function BestStaysSlider() {
  const [venues, setVenues] = useState<Venue[]>([]);
  useEffect(() => {
    async function loadSliderVenues() {
      try {
        const data = await Promise.all(
          sliderVenueIds.map((id) => getVenueById(id)),
        );

        setVenues(data);
      } catch (error) {
        console.error("Failed to load slider venues", error);
      }
    }

    loadSliderVenues();
  }, []);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const firstCard = sliderRef.current.querySelector(
      ".slider-card",
    ) as HTMLDivElement | null;

    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    sliderRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-6 pb-12 md:px-10 lg:px-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="main-heading">Explore Our Best Stays</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollSlider("left")}
            className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#303437] text-white"
            aria-label="previous slide"
          >
            <HiOutlineChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => scrollSlider("right")}
            className="flex  h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#303437] text-white"
            aria-label="next slide"
          >
            <HiOutlineChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="hide-scrollbar flex snap-x gap-4 overflow-x-auto scroll-smooth"
      >
        {venues.map((venue) => (
          <Link
            to={`/venue/${venue.id}`}
            key={venue.id}
            className="slider-card block w-full flex-shrink-0 snap-start overflow-hidden md:w-[calc((100%_-_16px)_/_2)] lg:w-[calc((100%_-_32px)_/_3)]"
            aria-label={`View details for ${venue.name}`}
          >
            <img
              src={venue.media?.[0]?.url}
              alt={venue.name}
              className="aspect-[16/9] w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestStaysSlider;
