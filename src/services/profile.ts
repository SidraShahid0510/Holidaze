import axios from "axios";

const API_PROFILE = "https://v2.api.noroff.dev/holidaze/profiles";
const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;

type UpdateProfileData = {
  avatar?: {
    url?: string;
    alt?: string;
  };
  banner?: {
    url?: string;
    alt?: string;
  };
};

// updates the logged-in user's profile
export async function updateProfile(
  name: string,
  data: UpdateProfileData,
  token: string,
) {
  const response = await axios.put(`${API_PROFILE}/${name}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return response.data;
}
export async function getUserBookings(name: string, token: string) {
  const response = await axios.get(
    `${API_PROFILE}/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    },
  );

  return response.data.data;
}
