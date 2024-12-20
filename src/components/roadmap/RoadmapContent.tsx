import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseList from "@/components/CourseList";
import PreferencesForm from "@/components/PreferencesForm";
import { UserPreferences } from "@/types/user";
import { Resource } from "@/hooks/useRoadmaps";

interface RoadmapContentProps {
  resources: Resource[];
  topCourses: any[];
  preferences: UserPreferences | null;
  onUpdatePreferences: (prefs: UserPreferences) => void;
}

const RoadmapContent = ({ 
  resources, 
  topCourses, 
  preferences, 
  onUpdatePreferences 
}: RoadmapContentProps) => {
  return (
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
                {resources.map((resource, index) => (
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
              onSave={onUpdatePreferences}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoadmapContent;