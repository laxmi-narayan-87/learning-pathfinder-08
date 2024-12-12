import { useQuery } from "@tanstack/react-query";
import { roadmapCategories } from "../data/roadmapCategories";
import { frontendRoadmap } from "../data/roadmaps/frontend";
import { backendRoadmap } from "../data/roadmaps/backend";

export interface Resource {
  title: string;
  url: string;
  type: "documentation" | "course" | "tutorial" | "guide";
}

export interface Section {
  title: string;
  topics: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  resources: Resource[];
}

const getRoadmapData = (id: string): Roadmap | null => {
  switch (id) {
    case "frontend":
      return frontendRoadmap;
    case "backend":
      return backendRoadmap;
    default:
      return null;
  }
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      // Simulate API call with local data
      return {
        categories: roadmapCategories,
        roadmaps: [frontendRoadmap, backendRoadmap]
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const roadmap = getRoadmapData(id);
      if (!roadmap) {
        throw new Error(`Roadmap with id ${id} not found`);
      }
      return roadmap;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};