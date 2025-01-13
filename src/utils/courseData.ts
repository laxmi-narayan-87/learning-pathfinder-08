interface Course {
  id: string;
  title: string;
  platform: string;
  rating: number;
  url: string;
}

export const fetchTopCourses = async (topic: string): Promise<Course[]> => {
  switch (topic.toLowerCase()) {
    case "devops":
      return [
        {
          id: "1",
          title: "Docker and Kubernetes: The Complete Guide",
          platform: "Udemy",
          rating: 4.8,
          url: "https://udemy.com/docker-kubernetes"
        },
        {
          id: "2",
          title: "AWS Certified DevOps Engineer Professional",
          platform: "A Cloud Guru",
          rating: 4.9,
          url: "https://acloudguru.com/aws-devops"
        },
        {
          id: "3",
          title: "Complete DevOps Pipeline Tutorial",
          platform: "Linux Academy",
          rating: 4.7,
          url: "https://linuxacademy.com/devops-pipeline"
        }
      ];
    case "mobile":
      return [
        {
          id: "1",
          title: "React Native - The Practical Guide",
          platform: "Udemy",
          rating: 4.8,
          url: "https://udemy.com/react-native-practical"
        },
        {
          id: "2",
          title: "Flutter & Dart - The Complete Guide",
          platform: "Academind",
          rating: 4.9,
          url: "https://academind.com/flutter-complete"
        },
        {
          id: "3",
          title: "iOS & Swift - The Complete iOS App Development Bootcamp",
          platform: "App Brewery",
          rating: 4.9,
          url: "https://appbrewery.com/ios-development"
        }
      ];
    case "frontend":
      return [
        {
          id: "1",
          title: "Advanced React and Redux",
          platform: "Udemy",
          rating: 4.8,
          url: "https://udemy.com/react-redux"
        },
        {
          id: "2",
          title: "JavaScript: The Hard Parts",
          platform: "Frontend Masters",
          rating: 4.9,
          url: "https://frontendmasters.com/javascript-hard-parts"
        },
        {
          id: "3",
          title: "CSS for JavaScript Developers",
          platform: "CSS for JS",
          rating: 4.9,
          url: "https://css-for-js.dev"
        }
      ];
    default:
      return [
        {
          id: "1",
          title: "Programming Fundamentals",
          platform: "Coursera",
          rating: 4.7,
          url: "https://coursera.org/programming-fundamentals"
        },
        {
          id: "2",
          title: "Computer Science Basics",
          platform: "edX",
          rating: 4.8,
          url: "https://edx.org/cs-basics"
        },
        {
          id: "3",
          title: "Problem Solving in Programming",
          platform: "Pluralsight",
          rating: 4.6,
          url: "https://pluralsight.com/problem-solving"
        }
      ];
  }
};