import { useParams } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmaps";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Flowchart } from "@/components/Flowchart";
import CourseList from "@/components/CourseList";
import { useQuery } from "@tanstack/react-query";

const fetchTopCourses = async (topic: string) => {
  console.log("Fetching courses for:", topic);
  // Simulated API call - in real app, replace with actual API endpoint
  return [
    {
      id: "1",
      title: "Complete Backend Development",
      platform: "Udemy",
      rating: 4.8,
      url: "https://udemy.com"
    },
    {
      id: "2",
      title: "Node.js Advanced Concepts",
      platform: "Coursera",
      rating: 4.7,
      url: "https://coursera.org"
    },
    {
      id: "3",
      title: "Database Design Masterclass",
      platform: "edX",
      rating: 4.9,
      url: "https://edx.org"
    }
  ];
};

const RoadmapView = () => {
  const { id } = useParams();
  const { data: roadmap, isLoading, error } = useRoadmap(id || "");
  
  const { data: topCourses } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchTopCourses(id || ""),
    enabled: !!id
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error || !roadmap) {
    return <div className="p-8">Roadmap not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Link to="/" className="inline-flex items-center text-primary mb-6 hover:text-primary/80">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Roadmaps
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
      <p className="text-gray-600 mb-8">{roadmap.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
          <ScrollArea className="h-[600px] rounded-md border p-4">
            {roadmap.sections.map((section, index) => (
              <Card key={index} className="mb-6 p-4">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ScrollArea>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Roadmap Visualization</h2>
            <Card className="p-4">
              <Flowchart sections={roadmap.sections} />
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Online Courses</h2>
            {topCourses && <CourseList courses={topCourses} />}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
            <div className="space-y-4">
              {roadmap.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border hover:border-primary transition-colors"
                >
                  <h4 className="font-semibold mb-1">{resource.title}</h4>
                  <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;