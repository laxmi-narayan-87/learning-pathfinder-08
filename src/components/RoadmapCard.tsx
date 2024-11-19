import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CourseList from "./CourseList";

export interface Course {
  id: string;
  title: string;
  platform: string;
  rating: number;
  url: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  icon: string;
}

const RoadmapCard = ({ roadmap }: { roadmap: Roadmap }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getImageForRoadmap = (title: string) => {
    switch (title.toLowerCase()) {
      case "web development":
        return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
      case "data science":
        return "https://images.unsplash.com/photo-1460925895917-afdab827c52f";
      case "mobile development":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
      default:
        return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageForRoadmap(roadmap.title)}
          alt={roadmap.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <h3 className="text-xl font-semibold text-white">{roadmap.title}</h3>
          <p className="mt-2 text-sm text-gray-200">{roadmap.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center text-primary hover:text-primary/80"
        >
          View Courses
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <CourseList courses={roadmap.courses} />
        </div>
      )}
    </div>
  );
};

export default RoadmapCard;