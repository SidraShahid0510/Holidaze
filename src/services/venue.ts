import axios from "axios";

const API_VENUES = "https://v2.api.noroff.dev/holidaze/venues";
const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;
// Get list of venues (pagination)
export async function getVenues(limit = 9, page = 1) {
  const response = await axios.get(
    `${API_VENUES}?limit=${limit}&page=${page}&sort=created&sortOrder=desc&_bookings=true`,
  );

  return response.data;
}

// Get single venue by ID
export async function getVenueById(id: string) {
  const response = await axios.get(
    `${API_VENUES}/${id}?_bookings=true&_owner=true`,
  );

  return response.data.data;
}
// Create new venue
export async function createVenue(data: any, token: string) {
  const response = await axios.post(API_VENUES, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return response.data;
}
// Update venue
export async function updateVenue(id: string, data: any, token: string) {
  const response = await axios.put(`${API_VENUES}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return response.data;
}

// Delete venue
export async function deleteVenue(id: string, token: string) {
  const response = await axios.delete(`${API_VENUES}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return response.data;
}
