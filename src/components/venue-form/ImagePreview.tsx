type Props = {
  imageUrl: string;
};

function ImagePreview({ imageUrl }: Props) {
  if (!imageUrl) return null;

  return (
    <img
      src={imageUrl}
      alt="Venue preview"
      className="w-full h-64 object-cover shadow-md"
    />
  );
}

export default ImagePreview;
