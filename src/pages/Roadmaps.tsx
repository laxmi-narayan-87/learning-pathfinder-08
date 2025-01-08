import { roadmapCategories } from "@/data/roadmapCategories";
import RoadmapCategories from "@/components/RoadmapCategories";

const Roadmaps = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Roadmaps</h1>
        <RoadmapCategories />
      </main>
    </div>
  );
};

export default Roadmaps;