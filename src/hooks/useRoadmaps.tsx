import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Roadmap } from "../components/RoadmapCard";

const fetchRoadmaps = async (): Promise<Roadmap[]> => {
  try {
    // This would be your actual API endpoint that does the web scraping
    const response = await axios.get('https://api.yourbackend.com/roadmaps');
    return response.data;
  } catch (error) {
    // Fallback to sample data if API is not available
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
        ],
      },
      {
        id: "2",
        title: "Data Science",
        description: "Learn data analysis, machine learning, and visualization",
        icon: "/placeholder.svg",
        courses: [
          {
            id: "c3",
            title: "Data Science Specialization",
            platform: "Coursera",
            rating: 4.7,
            url: "https://www.coursera.org/specializations/data-science",
          },
          {
            id: "c4",
            title: "Machine Learning A-Z",
            platform: "Udemy",
            rating: 4.6,
            url: "https://www.udemy.com/course/machinelearning",
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
            id: "c5",
            title: "iOS & Swift - The Complete iOS App Development Bootcamp",
            platform: "Udemy",
            rating: 4.8,
            url: "https://www.udemy.com/course/ios-13-app-development-bootcamp",
          },
          {
            id: "c6",
            title: "Android Development for Beginners",
            platform: "Google",
            rating: 4.7,
            url: "https://developer.android.com/courses",
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
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
    staleTime: 1000 * 60 * 30, // Consider data stale after 30 minutes
  });
};