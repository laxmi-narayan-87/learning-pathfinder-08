import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Changelog = () => {
  const changes = [
    {
      date: "2024-03-19",
      version: "1.0.1",
      changes: [
        {
          title: "Bug Fixes",
          items: [
            "Fixed script tag format for ThinkStack chatbot",
            "Changed from self-closing script tag to properly closed empty script tag",
            "Removed unnecessary whitespace",
            "Fixed URL format by removing trailing colon"
          ]
        }
      ]
    },
    {
      date: "2024-03-18",
      version: "1.0.0",
      changes: [
        {
          title: "Features",
          items: [
            "Initial release of SkillForge Academy",
            "Implemented user authentication system",
            "Added roadmap creation and viewing functionality",
            "Integrated AI-powered roadmap generation",
            "Created responsive dashboard interface"
          ]
        },
        {
          title: "UI Components",
          items: [
            "Implemented Hero component with dynamic navigation",
            "Added RoadmapCategories component for browsing learning paths",
            "Created SearchBar component for roadmap discovery",
            "Integrated AI Roadmap Generator component"
          ]
        },
        {
          title: "Infrastructure",
          items: [
            "Set up Supabase backend integration",
            "Configured authentication providers",
            "Implemented database schema for roadmaps",
            "Added row-level security policies"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Changelog</h1>
        <div className="space-y-6">
          {changes.map((release, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Version {release.version}</span>
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {release.changes.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Changelog;