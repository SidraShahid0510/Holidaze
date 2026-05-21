import { Link } from "react-router-dom";
import type { User } from "../../types/user";

type Props = {
  user: User | null;
  onEditClick: () => void;
};

function ProfileHeader({ user, onEditClick }: Props) {
  const displayName = user?.name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-white p-6 shadow-md flex flex-col md:flex-row items-center md:items-center gap-6">
        <img
          src={user?.avatar?.url || "https://i.pravatar.cc/150"}
          alt={user?.name}
          className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
        />

        <div className="text-center md:text-left">
          <h1 className="text-2xl font-serif font-semibold">{displayName}</h1>

          <p className="body-text mt-1">{user?.email}</p>

          <div className="flex justify-center md:justify-start gap-3 mt-4">
            <button
              onClick={onEditClick}
              className="bg-white border px-5 py-2 text-sm shadow-sm transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
            >
              Edit Profile
            </button>

            {user?.venueManager && (
              <Link
                to="/create-venue"
                className="bg-[#303437] text-white px-5 py-2 shadow-sm text-sm transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
              >
                New Venue
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
