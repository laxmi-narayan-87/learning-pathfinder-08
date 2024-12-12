import { Star } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  platform: string;
  rating: number;
  url: string;
}

const CourseList = ({ courses }: { courses: Course[] }) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <a
          key={course.id}
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white p-4 rounded-md shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{course.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{course.platform}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CourseList;