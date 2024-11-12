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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{roadmap.title}</h3>
            <p className="mt-2 text-gray-600">{roadmap.description}</p>
          </div>
          <img src={roadmap.icon} alt={roadmap.title} className="w-12 h-12" />
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 inline-flex items-center text-primary hover:text-primary/80"
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