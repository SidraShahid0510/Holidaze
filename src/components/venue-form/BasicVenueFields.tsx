import ImagePreview from "./ImagePreview";
type Props = {
  formData: {
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    maxGuests: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

function BasicVenueFields({ formData, onChange }: Props) {
  return (
    <>
      <div>
        <label htmlFor="venue-name" className="form-label">
          Venue Name
        </label>
        <input
          id="venue-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="venue-description" className="form-label">
          Description
        </label>
        <textarea
          id="venue-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          className="input-field min-h-32"
        />
      </div>

      <div>
        <label htmlFor="image-url" className="form-label">
          Image URL
        </label>
        <input
          id="image-url"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onChange}
          className="input-field"
        />
      </div>
      <ImagePreview imageUrl={formData.imageUrl} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label" htmlFor="price-per-night">
            Price per night
          </label>
          <input
            id="price-per-night"
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="form-label" htmlFor="Max-guests">
            Max Guests
          </label>
          <input
            id="Max-guests"
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={onChange}
            className="input-field"
          />
        </div>
      </div>
    </>
  );
}

export default BasicVenueFields;
