import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Beginner Roadmaps",
    description: "Start here if you're new to programming",
    paths: [
      { name: "Frontend Developer", description: "Learn to build user interfaces" },
      { name: "Backend Developer", description: "Master server-side development" },
      { name: "Full Stack Developer", description: "Cover both frontend and backend" }
    ]
  },
  {
    title: "Specialized Paths",
    description: "Deep dive into specific domains",
    paths: [
      { name: "Data Science", description: "Master data analysis and ML" },
      { name: "DevOps", description: "Learn deployment and operations" },
      { name: "Mobile Development", description: "Build mobile applications" }
    ]
  }
];

const RoadmapCategories = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {categories.map((category) => (
          <div key={category.title} className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
            <p className="text-gray-600 mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.paths.map((path) => (
                <Card key={path.name} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">{path.name}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <Link 
                    to={`/roadmap/${path.name.toLowerCase().replace(/ /g, '-')}`}
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