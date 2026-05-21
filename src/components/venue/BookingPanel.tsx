import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

type BookedRange = {
  from: Date;
  to: Date;
};

type Props = {
  venuePrice: number;
  maxGuests: number;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalGuests: number;
  guestText: string;
  nights: number;
  totalPrice: number;
  showCalendar: boolean;
  showGuestPanel: boolean;
  selectedRange: DateRange | undefined;
  bookedRanges: BookedRange[];
  onToggleCalendar: () => void;
  onToggleGuestPanel: () => void;
  onSelectRange: (range: DateRange | undefined) => void;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  onBook: () => void;
};

function BookingPanel({
  venuePrice,
  maxGuests,
  checkIn,
  checkOut,
  adults,
  children,
  totalGuests,
  guestText,
  nights,
  totalPrice,
  showCalendar,
  showGuestPanel,
  selectedRange,
  bookedRanges,
  onToggleCalendar,
  onToggleGuestPanel,
  onSelectRange,
  setAdults,
  setChildren,
  onBook,
}: Props) {
  return (
    <div className="bg-primary p-6 shadow-sm h-fit">
      <div className="space-y-2">
        <p className="body-text">per night</p>

        <div className="flex justify-between items-center">
          <p className=" text-lg lg:text-xl font-bold">NOK {venuePrice}</p>

          <div className="bg-secondary px-3 py-2 body-text font-semibold">
            Max {maxGuests} guests
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        <div className="relative">
          <button
            type="button"
            onClick={onToggleCalendar}
            className="w-full bg-white p-3 text-left"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="body-text font-medium">Check in</p>
                <p className="body-text">{checkIn || "Select date"}</p>
              </div>

              <div>
                <p className="body-text font-medium">Check out</p>
                <p className="body-text">{checkOut || "Select date"}</p>
              </div>
            </div>
          </button>
          {showCalendar && (
            <div className="mt-2 w-full flex justify-center xl:absolute xl:right-0 xl:z-30">
              <div className="w-fit max-w-full bg-white p-8  shadow-lg">
                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 border bg-white"></span>
                    <span>Available</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-gray-300"></span>
                    <span>Unavailable</span>
                  </div>
                </div>

                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={onSelectRange}
                  disabled={[{ before: new Date() }, ...bookedRanges]}
                  modifiers={{
                    booked: bookedRanges,
                  }}
                  modifiersClassNames={{
                    booked: "booked-day",
                  }}
                  excludeDisabled
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Guests</label>

          <button
            type="button"
            onClick={onToggleGuestPanel}
            className="w-full bg-white px-3 py-2 text-left"
          >
            {guestText}
          </button>

          {showGuestPanel && (
            <div className="absolute z-20 mt-2 w-full border bg-white p-4 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Adults</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(0, prev - 1))}
                      className="h-8 w-8 rounded-full border"
                    >
                      -
                    </button>

                    <span>{adults}</span>

                    <button
                      type="button"
                      onClick={() => {
                        if (totalGuests < maxGuests) {
                          setAdults((prev) => prev + 1);
                        }
                      }}
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
                      onClick={() => {
                        if (totalGuests < maxGuests) {
                          setChildren((prev) => prev + 1);
                        }
                      }}
                      className="h-8 w-8 rounded-full border"
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
                    onClick={onToggleGuestPanel}
                    className="bg-[#303437] px-4 py-2 text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4">
          <p className="body-text">Nights: {nights}</p>
          <p className=" text-lg lg:text-lg font-bold">
            Total: NOK {totalPrice}
          </p>
        </div>

        <button
          onClick={onBook}
          className="w-full bg-[#303437] py-3 text-base text-white font-semi-bold transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default BookingPanel;
