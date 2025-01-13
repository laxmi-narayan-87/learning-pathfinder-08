import { getRoadmapImage } from "@/utils/roadmapImages";

interface RoadmapHeroProps {
  id: string;
  title: string;
  description: string;
}

const RoadmapHero = ({ id, title, description }: RoadmapHeroProps) => {
  return (
    <div className="container mx-auto py-8">
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={getRoadmapImage(id)}
          alt={`${title} roadmap`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-200">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHero;