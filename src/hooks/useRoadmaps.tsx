import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Roadmap } from "../components/RoadmapCard";

const fetchRoadmaps = async (): Promise<Roadmap[]> => {
  try {
    const response = await axios.get('https://api.yourbackend.com/roadmaps');
    return response.data;
  } catch (error) {
    return [
      {
        id: "1",
        title: "Web Development",
        description: "Master modern web development from frontend to backend",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c1",
            title: "The Complete Web Developer in 2024",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery",
          },
          {
            id: "c2",
            title: "Full Stack Open 2024",
            platform: "University of Helsinki",
            rating: 4.9,
            url: "https://fullstackopen.com/",
          },
          {
            id: "c3",
            title: "JavaScript: The Advanced Concepts",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/advanced-javascript-concepts",
          },
          {
            id: "c4",
            title: "React - The Complete Guide",
            platform: "Udemy",
            rating: 4.7,
            url: "https://www.udemy.com/course/react-the-complete-guide",
          },
          {
            id: "c5",
            title: "Node.js Developer Course",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/the-complete-nodejs-developer-course",
          },
        ],
      },
      {
        id: "2",
        title: "Data Science",
        description: "Learn data analysis, machine learning, and visualization",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c6",
            title: "Data Science Specialization",
            platform: "Coursera",
            rating: 4.7,
            url: "https://www.coursera.org/specializations/data-science",
          },
          {
            id: "c7",
            title: "Machine Learning A-Z",
            platform: "Udemy",
            rating: 4.6,
            url: "https://www.udemy.com/course/machinelearning",
          },
          {
            id: "c8",
            title: "Python for Data Science and Machine Learning",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp",
          },
          {
            id: "c9",
            title: "Deep Learning Specialization",
            platform: "Coursera",
            rating: 4.9,
            url: "https://www.coursera.org/specializations/deep-learning",
          },
          {
            id: "c10",
            title: "Statistics and Probability in Data Science",
            platform: "edX",
            rating: 4.7,
            url: "https://www.edx.org/course/statistics-and-probability-in-data-science",
          },
        ],
      },
      {
        id: "3",
        title: "Mobile Development",
        description: "Build native mobile apps for iOS and Android",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c11",
            title: "iOS & Swift - The Complete iOS App Development Bootcamp",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/ios-13-app-development-bootcamp",
          },
          {
            id: "c12",
            title: "Android Development for Beginners",
            platform: "Google",
            rating: 4.7,
            url: "https://developer.android.com/courses",
          },
          {
            id: "c13",
            title: "React Native - The Practical Guide",
            platform: "Udemy",
            rating: 4.7,
            url: "https://www.udemy.com/course/react-native-the-practical-guide",
          },
          {
            id: "c14",
            title: "Flutter & Dart - The Complete Guide",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/flutter-dart-the-complete-guide",
          },
          {
            id: "c15",
            title: "SwiftUI Masterclass",
            platform: "Udemy",
            rating: 4.9,
            url: "https://www.udemy.com/course/swiftui-masterclass",
          },
        ],
      },
      {
        id: "4",
        title: "Artificial Intelligence",
        description: "Master AI concepts, neural networks, and deep learning",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c16",
            title: "AI Programming with Python",
            platform: "Udacity",
            rating: 4.8,
            url: "https://www.udacity.com/course/ai-programming-python-nanodegree--nd089",
          },
          {
            id: "c17",
            title: "Artificial Intelligence A-Z™",
            platform: "Udemy",
            rating: 4.7,
            url: "https://www.udemy.com/course/artificial-intelligence-az",
          },
          {
            id: "c18",
            title: "IBM AI Engineering Professional Certificate",
            platform: "Coursera",
            rating: 4.9,
            url: "https://www.coursera.org/professional-certificates/ai-engineer",
          },
          {
            id: "c19",
            title: "Applied AI with DeepLearning",
            platform: "IBM",
            rating: 4.6,
            url: "https://www.coursera.org/learn/ai",
          },
          {
            id: "c20",
            title: "Natural Language Processing Specialization",
            platform: "Coursera",
            rating: 4.8,
            url: "https://www.coursera.org/specializations/natural-language-processing",
          },
        ],
      },
      {
        id: "5",
        title: "Machine Learning",
        description: "Learn ML algorithms, data modeling, and predictive analytics",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c21",
            title: "Machine Learning Specialization",
            platform: "Stanford Online",
            rating: 4.9,
            url: "https://www.coursera.org/specializations/machine-learning-introduction",
          },
          {
            id: "c22",
            title: "TensorFlow Developer Certificate",
            platform: "Google",
            rating: 4.8,
            url: "https://www.tensorflow.org/certificate",
          },
          {
            id: "c23",
            title: "Machine Learning Engineering for Production",
            platform: "Coursera",
            rating: 4.7,
            url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
          },
          {
            id: "c24",
            title: "Practical Machine Learning with TensorFlow",
            platform: "Google Cloud",
            rating: 4.6,
            url: "https://www.coursera.org/learn/google-machine-learning",
          },
          {
            id: "c25",
            title: "Machine Learning with Python",
            platform: "IBM",
            rating: 4.8,
            url: "https://www.coursera.org/professional-certificates/ibm-machine-learning",
          },
        ],
      },
      {
        id: "6",
        title: "UI/UX Design",
        description: "Create beautiful, user-centered digital experiences",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c26",
            title: "Google UX Design Professional Certificate",
            platform: "Google",
            rating: 4.9,
            url: "https://www.coursera.org/professional-certificates/google-ux-design",
          },
          {
            id: "c27",
            title: "UI/UX Design Bootcamp",
            platform: "Udacity",
            rating: 4.8,
            url: "https://www.udacity.com/course/ux-designer-nanodegree--nd578",
          },
          {
            id: "c28",
            title: "Design Thinking Specialization",
            platform: "Coursera",
            rating: 4.7,
            url: "https://www.coursera.org/specializations/design-thinking-innovation",
          },
          {
            id: "c29",
            title: "Advanced UI/UX Design",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/advanced-ui-ux-design",
          },
          {
            id: "c30",
            title: "Figma UI/UX Design Essentials",
            platform: "Udemy",
            rating: 4.6,
            url: "https://www.udemy.com/course/figma-ux-ui-design-course",
          },
        ],
      },
    ];
  }
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmaps,
    refetchInterval: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 30,
  });
};
