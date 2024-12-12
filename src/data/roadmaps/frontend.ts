export const frontendRoadmap = {
  id: "frontend",
  title: "Frontend Developer",
  description: "Step by step guide to becoming a frontend developer",
  sections: [
    {
      title: "Internet Fundamentals",
      topics: [
        "How the internet works",
        "HTTP/HTTPS protocols",
        "DNS and hosting",
        "Browsers and their working"
      ]
    },
    {
      title: "HTML Foundations",
      topics: [
        "HTML basics",
        "Semantic HTML",
        "Forms and validations",
        "Conventions and best practices"
      ]
    },
    {
      title: "CSS Fundamentals",
      topics: [
        "CSS basics",
        "Selectors and specificity",
        "Box model",
        "Flexbox",
        "Grid",
        "Responsive design",
        "Animations"
      ]
    },
    {
      title: "JavaScript",
      topics: [
        "Syntax basics",
        "DOM manipulation",
        "Fetch API / AJAX",
        "ES6+ features",
        "Promises and async programming",
        "Error handling"
      ]
    },
    {
      title: "Framework",
      topics: [
        "React.js",
        "State management",
        "Routing",
        "Component lifecycle",
        "Hooks",
        "Performance optimization"
      ]
    },
    {
      title: "Version Control",
      topics: [
        "Git basics",
        "GitHub",
        "Branching strategies",
        "Collaborative development"
      ]
    }
  ],
  resources: [
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      type: "documentation" as const
    },
    {
      title: "Frontend Masters",
      url: "https://frontendmasters.com/",
      type: "course" as const
    },
    {
      title: "React Documentation",
      url: "https://react.dev/",
      type: "documentation" as const
    }
  ]
};