import Hero from "../components/Hero";
import RoadmapCategories from "../components/RoadmapCategories";
import SearchBar from "../components/SearchBar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={() => {}} />
          </div>
        </div>
        
        <RoadmapCategories />
      </main>
    </div>
  );
};

export default Index;