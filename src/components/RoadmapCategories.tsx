import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Beginner Roadmaps",
    description: "Start here if you're new to programming",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    paths: [
      { 
        name: "Frontend Developer", 
        id: "frontend", 
        description: "Learn to build user interfaces",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      },
      { 
        name: "Backend Developer", 
        id: "backend", 
        description: "Master server-side development",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      },
      { 
        name: "Full Stack Developer", 
        id: "fullstack", 
        description: "Cover both frontend and backend",
        image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
      }
    ]
  },
  {
    title: "Specialized Paths",
    description: "Deep dive into specific domains",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    paths: [
      { 
        name: "Web Scraping", 
        id: "webscraping", 
        description: "Master web scraping and automation",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      },
      { 
        name: "DevOps", 
        id: "devops", 
        description: "Learn deployment and operations",
        image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a"
      },
      { 
        name: "Mobile Development", 
        id: "mobile", 
        description: "Build mobile applications",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      }
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
                <Card key={path.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={path.image}
                      alt={path.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white">{path.name}</h3>
                      <p className="text-sm text-gray-200 mt-1">{path.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link 
                      to={`/roadmap/${path.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80"
                    >
                      View Roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
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