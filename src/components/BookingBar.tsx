import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

type BookingBarProps = {
  onSearch: (
    location: string,
    guests: number,
    checkIn: string,
    checkOut: string,
  ) => void;
  clearAfterSearch?: boolean;
};
function BookingBar({ onSearch, clearAfterSearch }: BookingBarProps) {
  const [location, setLocation] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showGuestPanel, setShowGuestPanel] = useState(false);

  const totalGuests = adults + children;

  const guestText =
    totalGuests === 0
      ? "Select guests"
      : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 w-full max-w-6xl mx-auto shadow-lg">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="form-label">Find Location</p>

          <div className="flex items-center gap-2 bg-primary px-4 py-3">
            <HiOutlineLocationMarker className="text-lg text-primary-col" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(location.trim(), totalGuests, checkIn, checkOut);
                }
              }}
              placeholder="Search location"
              className="w-full bg-transparent outline-none body-text"
            />
          </div>
        </div>

        <div className="relative lg:col-span-2">
          <p className="form-label">Dates</p>

          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full bg-primary px-3 py-2 md:px-4 md:py-3 text-left"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 ">
                <HiOutlineCalendar className="text-md text-primary-col" />
                <span className="body-text">{checkIn || "Check-in"}</span>
              </div>

              <div className="flex items-center gap-2 b">
                <HiOutlineCalendar className="text-md text-primary-col" />
                <span className="body-text">{checkOut || "Check-out"}</span>
              </div>
            </div>
          </button>

          {showCalendar && (
            <div className="absolute z-30 mt-2 w-full flex justify-center">
              <div className="w-fit bg-white p-3 md:p-4 shadow-lg">
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={(range) => {
                    setSelectedRange(range);

                    if (!range?.from) {
                      setCheckIn("");
                      setCheckOut("");
                      return;
                    }

                    setCheckIn(range.from.toISOString().split("T")[0]);

                    if (
                      range.to &&
                      range.to.getTime() !== range.from.getTime()
                    ) {
                      setCheckOut(range.to.toISOString().split("T")[0]);
                    } else {
                      setCheckOut("");
                    }
                  }}
                  disabled={{ before: new Date() }}
                  excludeDisabled
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <p className="form-label">Guests</p>

          <button
            type="button"
            onClick={() => setShowGuestPanel(!showGuestPanel)}
            aria-label="Select number of guests"
            aria-expanded={showGuestPanel}
            className="flex w-full items-center justify-between bg-primary px-3 py-2 md:px-4 md:py-3"
          >
            <div className="flex items-center gap-2 ">
              <HiOutlineUserGroup className="text-md text-primary-col" />
              <span className="body-text">{guestText}</span>
            </div>

            <HiOutlineChevronDown className="text-md text-primary-col" />
          </button>

          {showGuestPanel && (
            <div className="absolute z-30 mt-2 w-full bg-white p-4 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease number of adults"
                      onClick={() => setAdults((prev) => Math.max(0, prev - 1))}
                      className="h-8 w-8 rounded-full border"
                    >
                      -
                    </button>

                    <span>{adults}</span>

                    <button
                      type="button"
                      aria-label="Increase number of adults"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="h-8 w-8 rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Children</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease number of children"
                      onClick={() =>
                        setChildren((prev) => Math.max(0, prev - 1))
                      }
                      className="h-8 w-8 rounded-full border"
                    >
                      -
                    </button>

                    <span>{children}</span>

                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="h-8 w-8 rounded-full border"
                      aria-label="Increase number of children"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAdults(0);
                      setChildren(0);
                    }}
                    className="border px-4 py-2"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGuestPanel(false)}
                    className="bg-[#303437] px-4 py-2 text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              onSearch(location.trim(), totalGuests, checkIn, checkOut);

              if (clearAfterSearch) {
                setLocation("");
                setAdults(0);
                setChildren(0);
                setCheckIn("");
                setCheckOut("");
                setSelectedRange(undefined);
              }
            }}
            className="px-3 py-2 md:px-4 md:py-3 w-full btn-primary text-center"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingBar;
