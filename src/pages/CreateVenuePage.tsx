import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVenue, getVenueById, updateVenue } from "../services/venue";
import toast from "react-hot-toast";
import RatingSelect from "../components/venue-form/RatingSelect";
import FacilitiesFields from "../components/venue-form/FacilitiesFields";
import LocationFields from "../components/venue-form/LocationFields";
import BasicVenueFields from "../components/venue-form/BasicVenueFields";
function CreateVenuePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    maxGuests: "",
    rating: "0",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    country: "",
    address: "",
    city: "",
    zip: "",
    lat: "",
    lng: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = id ? "Edit Venue | Holidaze" : "Create Venue | Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        id
          ? "Update your venue details and manage your Holidaze listing."
          : "Create and publish a new venue on Holidaze.",
      );
    }
  }, [id]);

  useEffect(() => {
    async function loadVenue() {
      if (!id) return;

      try {
        const data = await getVenueById(id);

        setFormData({
          name: data.name || "",
          description: data.description || "",
          imageUrl: data.media?.[0]?.url || "",
          price: data.price?.toString() || "",
          maxGuests: data.maxGuests?.toString() || "",
          rating: data.rating?.toString() || "0",
          wifi: data.meta?.wifi || false,
          parking: data.meta?.parking || false,
          breakfast: data.meta?.breakfast || false,
          pets: data.meta?.pets || false,
          country: data.location?.country || "",
          address: data.location?.address || "",
          city: data.location?.city || "",
          zip: data.location?.zip || "",
          lat: data.location?.lat?.toString() || "",
          lng: data.location?.lng?.toString() || "",
        });
      } catch {
        console.error("Failed to load venue");
      }
    }

    loadVenue();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    const venueData = {
      name: formData.name,
      description: formData.description,
      media: [
        {
          url: formData.imageUrl,
          alt: formData.name,
        },
      ],
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),

      meta: {
        wifi: formData.wifi,
        parking: formData.parking,
        breakfast: formData.breakfast,
        pets: formData.pets,
      },

      location: {
        country: formData.country,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        lat: Number(formData.lat),
        lng: Number(formData.lng),
      },
    };
    try {
      if (id) {
        await updateVenue(id, venueData, user.accessToken);
        toast.success("Venue updated successfully");
        navigate(`/venue/${id}`);
      } else {
        await createVenue(venueData, user.accessToken);
        toast.success("Venue created successfully");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Failed to save venue", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-primary shadow-md p-8">
        <h1 className="main-heading text-center mb-6">
          {id ? "Edit Venue" : "Create New Venue"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <BasicVenueFields formData={formData} onChange={handleChange} />
          <RatingSelect value={formData.rating} onChange={handleChange} />
          <FacilitiesFields formData={formData} onChange={handleChange} />
          <LocationFields formData={formData} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-[#303437]  text-white py-2 text-base font-semibold transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
          >
            {id ? "Save Changes" : "Create Venue"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreateVenuePage;
