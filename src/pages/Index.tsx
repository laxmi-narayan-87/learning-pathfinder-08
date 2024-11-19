import { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import RoadmapCard from "../components/RoadmapCard";
import ChatBot from "../components/ChatBot";
import { useRoadmaps } from "../hooks/useRoadmaps";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: roadmaps, isLoading } = useRoadmaps();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoadmaps = roadmaps?.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main className="py-16">
        <div className="container px-4 mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Explore Learning Roadmaps
            </h2>
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoadmaps?.map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
          )}
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default Index;