import { useEffect, useState } from "react";
import type { User } from "../types/user";
import type { Venue } from "../types/venue";
import type { Booking } from "../types/booking";
import { updateProfile, getUserBookings } from "../services/profile";
import { Link } from "react-router-dom";
import { getVenueById } from "../services/venue";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";
import ManagerVenueCard from "../components/profile/ManagerVenueCard";
import CustomerBookingsSection from "../components/profile/CustomerBookingsSection";
import EditProfileForm from "../components/profile/EditProfileForm";
import ProfileHeader from "../components/profile/ProfileHeader";
function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    avatarUrl: "",
    bannerUrl: "",
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setEditForm({
      avatarUrl: "",
      bannerUrl: "",
    });
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const updateData: {
      avatar?: { url?: string; alt?: string };
      banner?: { url?: string; alt?: string };
    } = {};

    const avatarUrl = editForm.avatarUrl.trim();
    const bannerUrl = editForm.bannerUrl.trim();

    if (avatarUrl) {
      updateData.avatar = {
        url: avatarUrl,
        alt: `${user.name} avatar`,
      };
    }

    if (bannerUrl) {
      updateData.banner = {
        url: bannerUrl,
        alt: `${user.name} banner`,
      };
    }
    if (!updateData.avatar && !updateData.banner) {
      return;
    }

    try {
      const response = await updateProfile(
        user.name,
        updateData,
        user.accessToken,
      );

      const updatedUser = {
        ...user,
        ...response.data,
        accessToken: user.accessToken,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("authChange"));
      setIsEditOpen(false);
    } catch {
      console.error("Failed to update profile");
    }
  };

  const fetchBookings = async (currentUser: User) => {
    try {
      const data = await getUserBookings(
        currentUser.name,
        currentUser.accessToken,
      );

      const updatedUser = {
        ...currentUser,
        venueManager: data.venueManager,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setBookings(data.bookings || []);

      const venuesWithBookings = await Promise.all(
        (data.venues || []).map((venue: Venue) => getVenueById(venue.id)),
      );

      setVenues(venuesWithBookings);
    } catch {
      console.error("Failed to fetch profile data");
    } finally {
      setIsProfileLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const parsedUser: User = JSON.parse(storedUser);

      await fetchBookings(parsedUser);
    };

    void loadProfile();
  }, []);

  useEffect(() => {
    document.title = "My Profile | Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View your bookings, manage your venues, and update your Holidaze profile.",
      );
    }
  }, []);

  return (
    <section className="bg-white min-h-screen pb-16">
      {/* Cover */}
      <div className="h-72 w-full overflow-hidden">
        <img
          src={
            user?.banner?.url ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          }
          alt={`${user?.name || "User"} profile banner`}
          width="1600"
          height="500"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Profile card */}
      <ProfileHeader
        user={user}
        onEditClick={() => {
          setEditForm({
            avatarUrl: user?.avatar?.url || "",
            bannerUrl: user?.banner?.url || "",
          });
          setIsEditOpen(true);
        }}
      />

      <EditProfileForm
        editForm={editForm}
        isEditOpen={isEditOpen}
        onChange={handleEditChange}
        onCancel={handleCancelEdit}
        onSave={handleSaveProfile}
      />

      {/* Content */}
      <div className="mt-16 px-6 max-w-6xl mx-auto">
        <h1 className="main-heading font-serif text-center mb-10">
          {user?.venueManager ? "My Venues" : "My Bookings"}
        </h1>
        <div className="space-y-8">
          {isProfileLoading ? (
            <ProfileSkeleton />
          ) : user?.venueManager ? (
            venues.length === 0 ? (
              <div className="text-center py-12 bg-primary shadow-md">
                <p className="body-text mb-2">No venues to display.</p>

                <p className="body-text mb-6">
                  Add some venues to your profile to see them here.
                </p>

                <Link
                  to="/"
                  className="inline-block bg-[#303437] text-white px-6 py-2 transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
                >
                  See all venues
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <ManagerVenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            )
          ) : (
            <CustomerBookingsSection bookings={bookings} />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
