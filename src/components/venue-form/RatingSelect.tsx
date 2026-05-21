import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function RatingSelect({ value, onChange }: Props) {
  return (
    <div>
      <label htmlFor="rating" className="form-label">
        Rating
      </label>

      <div className="relative">
        <select
          id="rating"
          name="rating"
          value={value}
          onChange={onChange}
          className="input-field appearance-none pr-12"
        >
          <option value="0">0 stars</option>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
        />
      </div>
    </div>
  );
}

export default RatingSelect;
