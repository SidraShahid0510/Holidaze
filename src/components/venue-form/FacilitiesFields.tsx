type Props = {
  formData: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FacilitiesFields({ formData, onChange }: Props) {
  return (
    <div>
      <h2 className="form-label">Facilities</h2>

      <div className="grid grid-cols-2 gap-3 body-text">
        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={formData.wifi}
            onChange={onChange}
            className="mr-2"
          />
          Wifi
        </label>

        <label>
          <input
            type="checkbox"
            name="parking"
            checked={formData.parking}
            onChange={onChange}
            className="mr-2"
          />
          Parking
        </label>

        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={formData.breakfast}
            onChange={onChange}
            className="mr-2"
          />
          Breakfast
        </label>

        <label>
          <input
            type="checkbox"
            name="pets"
            checked={formData.pets}
            onChange={onChange}
            className="mr-2"
          />
          Pets
        </label>
      </div>
    </div>
  );
}

export default FacilitiesFields;
