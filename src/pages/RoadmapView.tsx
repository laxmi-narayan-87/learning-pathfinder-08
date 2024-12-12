import { useParams } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmaps";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Flowchart } from "@/components/Flowchart";
import CourseList from "@/components/CourseList";
import { useQuery } from "@tanstack/react-query";
import { useUserProgress } from "@/hooks/useUserProgress";
import PreferencesForm from "@/components/PreferencesForm";
import { SkillAssessment } from "@/components/SkillAssessment";

const sampleQuestions = [
  {
    id: 1,
    text: "What is the primary purpose of HTML in web development?",
    options: [
      "Styling web pages",
      "Structuring content",
      "Handling server requests",
      "Managing databases"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which CSS property is used to change text color?",
    options: [
      "text-color",
      "font-color",
      "color",
      "text-style"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "What is the correct way to declare a JavaScript variable?",
    options: [
      "variable name = value",
      "var name = value",
      "v name = value",
      "variable: value"
    ],
    correctAnswer: 1
  }
];

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
  const { progress, preferences, markTopicComplete, updatePreferences, getRecommendedContent } = useUserProgress();
  
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

  const { nextTopics, recommendedResources } = getRecommendedContent();

  return (
    <div className="container mx-auto py-8">
      <Link to="/" className="inline-flex items-center text-primary mb-6 hover:text-primary/80">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Roadmaps
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
          <p className="text-gray-600 mb-8">{roadmap.description}</p>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
              <div className="space-y-2">
                <p>Completed topics: {progress.completedTopics.length}</p>
                <p>Current level: {progress.currentLevel}</p>
                <p>Last activity: {new Date(progress.lastActivity).toLocaleDateString()}</p>
              </div>
            </Card>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
              <Flowchart sections={roadmap.sections} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Skill Assessment</h2>
              <SkillAssessment 
                topic={roadmap.title}
                questions={sampleQuestions}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Recommended Courses</h2>
              {topCourses && <CourseList courses={topCourses} />}
            </div>
          </div>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Learning Preferences</h2>
            <PreferencesForm
              initialPreferences={preferences}
              onSave={updatePreferences}
            />
          </Card>

          <Card className="p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <div className="space-y-4">
              {nextTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{topic}</span>
                  <button
                    onClick={() => markTopicComplete(topic)}
                    className="text-primary hover:text-primary/80"
                  >
                    Mark as complete
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;