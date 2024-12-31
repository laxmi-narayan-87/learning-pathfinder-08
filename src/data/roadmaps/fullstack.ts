export const fullstackRoadmap = {
  id: "fullstack",
  title: "Full Stack Developer",
  description: "Complete guide to becoming a full stack developer",
  sections: [
    {
      title: "Frontend Development",
      topics: [
        "HTML5 & Semantic HTML",
        "CSS3 & Modern Features",
        "JavaScript ES6+",
        "React.js",
        "State Management",
        "Frontend Build Tools",
        "Web Performance",
        "Responsive Design"
      ]
    },
    {
      title: "Backend Development",
      topics: [
        "Node.js",
        "Express.js",
        "Database Design",
        "SQL (PostgreSQL)",
        "NoSQL (MongoDB)",
        "RESTful APIs",
        "Authentication & Authorization",
        "Server Security"
      ]
    },
    {
      title: "DevOps & Deployment",
      topics: [
        "Git Version Control",
        "Docker Basics",
        "CI/CD Pipelines",
        "Cloud Platforms (AWS/Vercel)",
        "Monitoring & Logging",
        "Performance Optimization",
        "Security Best Practices"
      ]
    },
    {
      title: "Additional Skills",
      topics: [
        "System Design",
        "Testing Strategies",
        "API Documentation",
        "Agile Development",
        "Problem Solving",
        "Code Review",
        "Technical Writing"
      ]
    }
  ],
  resources: [
    {
      title: "Full Stack Open",
      url: "https://fullstackopen.com/",
      type: "course" as const
    },
    {
      title: "The Odin Project",
      url: "https://www.theodinproject.com/",
      type: "tutorial" as const
    },
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      type: "documentation" as const
    }
  ]
};