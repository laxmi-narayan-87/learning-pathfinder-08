export const frontendRoadmap = {
  id: "frontend",
  title: "Frontend Developer",
  description: "Step by step guide to becoming a modern frontend developer",
  sections: [
    {
      title: "Internet & Web Fundamentals",
      topics: [
        "How does the Internet Work?",
        "What is HTTP/HTTPS?",
        "DNS and Domain Names",
        "Browsers and How they Work",
        "Hosting and Deployment"
      ]
    },
    {
      title: "HTML Foundations",
      topics: [
        "HTML Basics & Document Structure",
        "Semantic HTML",
        "Forms & Validation",
        "Best Practices & Conventions",
        "SEO Fundamentals"
      ]
    },
    {
      title: "CSS Mastery",
      topics: [
        "CSS Fundamentals",
        "Selectors & Specificity",
        "Box Model & Layout",
        "Flexbox",
        "CSS Grid",
        "Responsive Design",
        "CSS Animations",
        "CSS Architecture (BEM)",
        "CSS Preprocessors (Sass)",
        "Modern CSS (Tailwind)"
      ]
    },
    {
      title: "JavaScript Essentials",
      topics: [
        "JavaScript Syntax",
        "DOM Manipulation",
        "Event Handling",
        "ES6+ Features",
        "Asynchronous JavaScript",
        "Error Handling",
        "JavaScript Modules",
        "Browser Storage",
        "HTTP Requests & APIs"
      ]
    },
    {
      title: "Frontend Framework",
      topics: [
        "React Fundamentals",
        "Components & Props",
        "State Management",
        "Hooks",
        "Context API",
        "React Router",
        "API Integration",
        "Performance Optimization",
        "Testing in React"
      ]
    },
    {
      title: "Build Tools & Deployment",
      topics: [
        "Package Managers (npm/yarn)",
        "Module Bundlers (Vite/Webpack)",
        "Version Control (Git)",
        "CI/CD Basics",
        "Deployment Platforms",
        "Docker Basics",
        "Cloud Services (AWS/Vercel)"
      ]
    },
    {
      title: "Professional Development",
      topics: [
        "Code Review Best Practices",
        "Agile Development",
        "Technical Documentation",
        "Open Source Contribution",
        "Portfolio Development",
        "Interview Preparation",
        "Continuous Learning"
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
    },
    {
      title: "CSS Tricks",
      url: "https://css-tricks.com/",
      type: "guide" as const
    },
    {
      title: "JavaScript.info",
      url: "https://javascript.info/",
      type: "documentation" as const
    }
  ],
  topicQuestions: {
    "How does the Internet Work?": [
      {
        id: 1,
        text: "What is the primary function of DNS?",
        options: [
          "To style web pages",
          "To convert domain names to IP addresses",
          "To encrypt data",
          "To compress images"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "Which protocol is used for secure data transmission over the web?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correctAnswer: 1
      }
    ],
    "HTML Basics & Document Structure": [
      {
        id: 1,
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hybrid Text Making Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        text: "Which tag is used to define the main content of an HTML document?",
        options: ["<main>", "<body>", "<content>", "<article>"],
        correctAnswer: 0
      }
    ],
    "CSS Fundamentals": [
      {
        id: 1,
        text: "Which CSS property is used to change text color?",
        options: ["text-color", "font-color", "color", "text-style"],
        correctAnswer: 2
      },
      {
        id: 2,
        text: "What is the correct CSS syntax for making all paragraphs bold?",
        options: [
          "p {font-weight: bold;}",
          "p {text-weight: bold;}",
          "<p style='font-weight: bold'>",
          "p.style (bold)"
        ],
        correctAnswer: 0
      }
    ],
    "JavaScript Syntax": [
      {
        id: 1,
        text: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 2,
        text: "What is the correct way to write a comment in JavaScript?",
        options: [
          "<!-- comment -->",
          "// comment",
          "/* comment */",
          "Both B and C"
        ],
        correctAnswer: 3
      }
    ]
  }
};
