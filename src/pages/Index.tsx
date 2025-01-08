import Hero from "../components/Hero";
import RoadmapCategories from "../components/RoadmapCategories";
import SearchBar from "../components/SearchBar";
import AIRoadmapGenerator from "../components/AIRoadmapGenerator";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { preferences } = useUserProgress();
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const { toast } = useToast();

  const handleRoadmapGenerated = (roadmap: any) => {
    setGeneratedRoadmap(roadmap);
  };

  const handleRefresh = () => {
    window.location.reload();
    toast({
      title: "Page refreshed",
      description: "The content has been updated.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="icon"
          className="rounded-full shadow-md hover:shadow-lg"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
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