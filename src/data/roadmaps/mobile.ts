export const mobileRoadmap = {
  id: "mobile",
  title: "Mobile Developer",
  description: "Complete guide to becoming a mobile developer",
  sections: [
    {
      title: "Programming Fundamentals",
      topics: [
        "Object-Oriented Programming",
        "Data Structures",
        "Algorithms",
        "Design Patterns",
        "Clean Code Principles"
      ]
    },
    {
      title: "Cross-Platform Development",
      topics: [
        "React Native Basics",
        "React Native Navigation",
        "State Management",
        "Native Modules",
        "Performance Optimization",
        "Platform-Specific Code"
      ]
    },
    {
      title: "UI/UX for Mobile",
      topics: [
        "Mobile Design Principles",
        "Responsive Layouts",
        "Animation & Gestures",
        "Accessibility",
        "Platform Guidelines",
        "Design Systems"
      ]
    },
    {
      title: "Mobile Features",
      topics: [
        "Push Notifications",
        "Local Storage",
        "Camera & Media",
        "Location Services",
        "Background Tasks",
        "Device APIs"
      ]
    },
    {
      title: "Testing & Deployment",
      topics: [
        "Unit Testing",
        "Integration Testing",
        "E2E Testing",
        "App Store Guidelines",
        "CI/CD for Mobile",
        "App Distribution"
      ]
    }
  ],
  resources: [
    {
      title: "React Native Documentation",
      url: "https://reactnative.dev/docs/getting-started",
      type: "documentation" as const
    },
    {
      title: "Mobile App Design",
      url: "https://material.io/design/platform-guidance/android-mobile.html",
      type: "guide" as const
    },
    {
      title: "App Store Guidelines",
      url: "https://developer.apple.com/app-store/guidelines/",
      type: "documentation" as const
    }
  ]
};