type DealCardProps = {
  image: string;
  title: string;

  tag: string;
};

function DealCard({ image, title, tag }: DealCardProps) {
  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="aspect-[16/9] w-full object-cover"
        />

        <div className="absolute top-4 left-4 lg:top-8 lg-left-8">
          <span className="body-text  px-4 py-2 deal-tag">{tag}</span>
        </div>
      </div>
      <p className="text-center mt-3 font-semibold text-lg md:text-xl lg:text-2xl font-serif">
        {title}
      </p>
    </div>
  );
}

export default DealCard;
