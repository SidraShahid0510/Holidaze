import axios from "axios";

const API_BOOKINGS = "https://v2.api.noroff.dev/holidaze/bookings";
const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;

export async function createBooking(bookingData: {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}) {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const token = user?.accessToken;

  const response = await axios.post(API_BOOKINGS, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return response.data.data;
}
