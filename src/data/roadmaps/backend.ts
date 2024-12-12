export const backendRoadmap = {
  id: "backend",
  title: "Backend Developer",
  description: "Complete guide to becoming a backend developer",
  sections: [
    {
      title: "Programming Language",
      topics: [
        "JavaScript (Node.js)",
        "Python",
        "Java",
        "C#",
        "Language-specific best practices"
      ]
    },
    {
      title: "Databases",
      topics: [
        "SQL fundamentals",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Database design",
        "ORMs"
      ]
    },
    {
      title: "APIs",
      topics: [
        "REST",
        "GraphQL",
        "Authentication",
        "API security",
        "Rate limiting",
        "Documentation"
      ]
    },
    {
      title: "Web Security",
      topics: [
        "HTTPS",
        "CORS",
        "Security best practices",
        "Content Security Policy",
        "OAuth 2.0",
        "JWT"
      ]
    },
    {
      title: "Testing",
      topics: [
        "Unit testing",
        "Integration testing",
        "API testing",
        "Test automation",
        "TDD"
      ]
    },
    {
      title: "DevOps Basics",
      topics: [
        "CI/CD",
        "Docker basics",
        "Deployment strategies",
        "Monitoring",
        "Logging"
      ]
    }
  ],
  resources: [
    {
      title: "Node.js Documentation",
      url: "https://nodejs.org/docs/latest/",
      type: "documentation" as const
    },
    {
      title: "PostgreSQL Tutorial",
      url: "https://www.postgresqltutorial.com/",
      type: "tutorial" as const
    },
    {
      title: "REST API Design Best Practices",
      url: "https://github.com/microsoft/api-guidelines",
      type: "guide" as const
    }
  ]
};