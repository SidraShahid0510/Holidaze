export type Booking = {
  id: string;
  created: string;
  dateFrom: string;
  dateTo: string;
  guests: number;

  venue?: {
    id?: string;
    name?: string;
    price?: number;

    media?: {
      url: string;
      alt?: string;
    }[];
  };
};
