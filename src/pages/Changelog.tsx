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