import { useQuery } from "@tanstack/react-query";
import type { Roadmap } from "../components/RoadmapCard";

// Simulated API call - replace with actual API endpoint
const fetchRoadmaps = async (): Promise<Roadmap[]> => {
  // Simulated data - replace with actual API call
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
          url: "#",
        },
        {
          id: "c2",
          title: "Full Stack Open 2024",
          platform: "University of Helsinki",
          rating: 4.9,
          url: "#",
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
          url: "#",
        },
        {
          id: "c4",
          title: "Machine Learning A-Z",
          platform: "Udemy",
          rating: 4.6,
          url: "#",
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
          url: "#",
        },
        {
          id: "c6",
          title: "Android Development for Beginners",
          platform: "Google",
          rating: 4.7,
          url: "#",
        },
      ],
    },
  ];
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmaps,
  });
};