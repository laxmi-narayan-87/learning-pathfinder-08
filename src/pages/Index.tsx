import Hero from "../components/Hero";
import RoadmapCategories from "../components/RoadmapCategories";
import SearchBar from "../components/SearchBar";
import AIRoadmapGenerator from "../components/AIRoadmapGenerator";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useState } from "react";

const Index = () => {
  const { preferences } = useUserProgress();
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  const handleRoadmapGenerated = (roadmap: any) => {
    setGeneratedRoadmap(roadmap);
    // You can add additional logic here to save the roadmap or update the UI
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={() => {}} />
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6">Generate Your Personal Learning Path</h2>
            <AIRoadmapGenerator 
              onRoadmapGenerated={handleRoadmapGenerated}
              initialPreferences={preferences}
            />
          </div>
        </div>
        
        <RoadmapCategories />
      </main>
    </div>
  );
};

export default Index;