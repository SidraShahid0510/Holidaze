type Props = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  checkIn: string;
  checkOut: string;
  totalGuests: number;
  nights: number;
  price: number;
  totalPrice: number;
};

function BookingConfirmModal({
  show,
  onClose,
  onConfirm,
  checkIn,
  checkOut,
  totalGuests,
  nights,
  price,
  totalPrice,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>

        <p className="body-text mb-4">
          Please confirm the details below before proceeding.
        </p>

        <div className="space-y-2 body-text">
          <p>
            <strong>Selected booking dates:</strong>
          </p>
          <p>
            {checkIn} - {checkOut}
          </p>

          <p>
            <strong>Guests:</strong> {totalGuests}
          </p>

          <p>
            <strong>Price:</strong> NOK {price} x {nights} nights
          </p>

          <p>
            <strong>Total price:</strong> NOK {totalPrice}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="border px-5 py-2">
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#303437] px-5 py-2 text-white"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmModal;
