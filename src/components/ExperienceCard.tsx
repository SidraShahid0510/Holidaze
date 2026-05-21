type ExperienceCardProps = {
  image: string;
  text: string;
};

function ExperienceCard({ image, text }: ExperienceCardProps) {
  return (
    <div>
      <img
        src={image}
        alt="Experience"
        className="   aspect-[16/9] 
      md:aspect-[3/4] 
      lg:aspect-[4/5] w-full object-cover"
      />
      <p className="mt-3 text-center body-text">{text}</p>
    </div>
  );
}

export default ExperienceCard;
