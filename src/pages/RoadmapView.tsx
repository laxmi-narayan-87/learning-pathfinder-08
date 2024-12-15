import { useParams } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmaps";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, BookOpen, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import CourseList from "@/components/CourseList";
import { useQuery } from "@tanstack/react-query";
import { useUserProgress } from "@/hooks/useUserProgress";
import PreferencesForm from "@/components/PreferencesForm";
import { SkillAssessment } from "@/components/SkillAssessment";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoadmapView = () => {
  const { id } = useParams();
  const { data: roadmap, isLoading, error } = useRoadmap(id || "");
  const { progress, preferences, markTopicComplete, updatePreferences } = useUserProgress();
  
  const { data: topCourses } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchTopCourses(id || ""),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
        <Link to="/" className="text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto py-8">
          <Link to="/" className="inline-flex items-center text-primary mb-6 hover:text-primary/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roadmaps
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">{roadmap.title}</h1>
              <p className="text-gray-600 max-w-2xl mb-6">{roadmap.description}</p>
              
              <div className="flex gap-4">
                <Button variant="outline" className="gap-2">
                  <Globe className="h-4 w-4" />
                  Visit Website
                </Button>
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  Contribute
                </Button>
                <Button variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Resources
                </Button>
              </div>
            </div>

            <Card className="p-4 w-64">
              <div className="text-sm text-gray-600 mb-2">Progress</div>
              <div className="text-2xl font-bold mb-2">
                {Math.round((progress.completedTopics.length / 
                  roadmap.sections.reduce((acc, section) => acc + section.topics.length, 0)) * 100)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ 
                    width: `${(progress.completedTopics.length / 
                      roadmap.sections.reduce((acc, section) => acc + section.topics.length, 0)) * 100}%` 
                  }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="resources">Learning Resources</TabsTrigger>
            <TabsTrigger value="preferences">Learning Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Official Resources</h2>
                <div className="space-y-4">
                  {roadmap.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="font-medium">{resource.title}</div>
                        <div className="text-sm text-gray-500 capitalize">{resource.type}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Recommended Courses</h2>
                {topCourses && <CourseList courses={topCourses} />}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Learning Preferences</h2>
              <PreferencesForm
                initialPreferences={preferences}
                onSave={updatePreferences}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const fetchTopCourses = async (topic: string) => {
  return [
    {
      id: "1",
      title: "Complete Frontend Development",
      platform: "Udemy",
      rating: 4.8,
      url: "https://udemy.com"
    },
    {
      id: "2",
      title: "React.js Advanced Concepts",
      platform: "Frontend Masters",
      rating: 4.9,
      url: "https://frontendmasters.com"
    },
    {
      id: "3",
      title: "Modern CSS Masterclass",
      platform: "Coursera",
      rating: 4.7,
      url: "https://coursera.org"
    }
  ];
};

export default RoadmapView;
