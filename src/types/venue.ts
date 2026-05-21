export type Venue = {
  id: string;
  name: string;
  description: string;
  media: {
    url: string;
    alt: string;
  }[];
  price: number;
  rating: number;
  maxGuests: number;

  owner?: {
    name: string;
    email?: string;
  };

  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };

  location: {
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };

  bookings?: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    customer?: {
      name: string;
      email?: string;
    };
  }[];
};
