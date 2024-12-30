import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Beginner Roadmaps",
    description: "Start here if you're new to programming",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    paths: [
      { name: "Frontend Developer", id: "frontend", description: "Learn to build user interfaces" },
      { name: "Backend Developer", id: "backend", description: "Master server-side development" },
      { name: "Full Stack Developer", id: "fullstack", description: "Cover both frontend and backend" }
    ]
  },
  {
    title: "Specialized Paths",
    description: "Deep dive into specific domains",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    paths: [
      { name: "Web Scraping", id: "webscraping", description: "Master web scraping and automation" },
      { name: "DevOps", id: "devops", description: "Learn deployment and operations" },
      { name: "Mobile Development", id: "mobile", description: "Build mobile applications" }
    ]
  }
];

const RoadmapCategories = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {categories.map((category) => (
          <div key={category.title} className="mb-12">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={category.image}
                alt={category.title}
                className="w-32 h-32 rounded-lg object-cover shadow-lg"
              />
              <div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
                <p className="text-gray-600 mt-2">{category.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.paths.map((path) => (
                <Card key={path.name} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{path.name}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <Link 
                    to={`/roadmap/${path.id}`}
                    className="inline-flex items-center text-primary hover:text-primary/80"
                  >
                    View Roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCategories;