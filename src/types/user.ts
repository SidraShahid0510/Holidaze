export type User = {
  name: string;
  email: string;
  accessToken: string;

  venueManager?: boolean; // ✅ add this

  avatar?: {
    url?: string;
  };

  banner?: {
    url?: string;
  };
};
