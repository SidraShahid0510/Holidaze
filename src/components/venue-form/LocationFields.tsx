type Props = {
  formData: {
    country: string;
    address: string;
    city: string;
    zip: string;
    lat: string;
    lng: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function LocationFields({ formData, onChange }: Props) {
  return (
    <div>
      <h2 className="form-label">Location</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={onChange}
          placeholder="Country"
          className="input-field"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          className="input-field"
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="City"
          className="input-field"
        />

        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={onChange}
          placeholder="Zip (optional)"
          className="input-field"
        />

        <input
          type="number"
          name="lat"
          value={formData.lat}
          onChange={onChange}
          placeholder="Latitude"
          className="input-field"
        />

        <input
          type="number"
          name="lng"
          value={formData.lng}
          onChange={onChange}
          placeholder="Longitude"
          className="input-field"
        />
      </div>
    </div>
  );
}

export default LocationFields;
