type EditForm = {
  avatarUrl: string;
  bannerUrl: string;
};

type Props = {
  editForm: EditForm;
  isEditOpen: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCancel: () => void;
  onSave: () => void;
};

function EditProfileForm({
  editForm,
  isEditOpen,
  onChange,
  onCancel,
  onSave,
}: Props) {
  return (
    <div
      className={`max-w-6xl mx-auto px-6 overflow-hidden transition-all duration-500 ease-in-out ${
        isEditOpen ? "max-h-[800px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
      }`}
    >
      <div className="bg-primary shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-8 font-serif">
          Edit Profile
        </h2>

        <div className="space-y-6">
          <div>
            <label className="form-label">Avatar URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={editForm.avatarUrl}
              onChange={onChange}
              placeholder="Enter avatar image URL"
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Banner URL</label>
            <input
              type="text"
              name="bannerUrl"
              value={editForm.bannerUrl}
              onChange={onChange}
              placeholder="Enter banner image URL"
              className="input-field"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="border px-5 py-2 bg-white transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              className="bg-[#303437] text-white px-5 py-2 transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
