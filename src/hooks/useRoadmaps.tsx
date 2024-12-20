import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { frontendRoadmap } from "../data/roadmaps/frontend";
import { backendRoadmap } from "../data/roadmaps/backend";
import { webscrapingRoadmap } from "../data/roadmaps/webscraping";

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

const getRoadmapData = async (id: string): Promise<Roadmap | null> => {
  // First try to fetch from Supabase
  const { data: roadmapData, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('title', id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (roadmapData) {
    return {
      id: roadmapData.id,
      title: roadmapData.title,
      description: roadmapData.description || '',
      sections: roadmapData.sections,
      resources: [] // Resources will be handled separately
    };
  }

  // Fallback to static data if no dynamic roadmap exists
  switch (id) {
    case "frontend":
      return frontendRoadmap;
    case "backend":
      return backendRoadmap;
    case "webscraping":
      return webscrapingRoadmap;
    default:
      return null;
  }
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data: dynamicRoadmaps, error } = await supabase
        .from('roadmaps')
        .select('*')
        .order('created_at', { ascending: false });

      const staticRoadmaps = [frontendRoadmap, backendRoadmap, webscrapingRoadmap];

      return {
        categories: {
          beginner: {
            title: "Learning Paths",
            description: "Curated roadmaps for different skill levels",
            roadmaps: [...(dynamicRoadmaps || []), ...staticRoadmaps]
          }
        },
        roadmaps: [...(dynamicRoadmaps || []), ...staticRoadmaps]
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRoadmap = (id: string) => {
  return useQuery({
    queryKey: ["roadmap", id],
    queryFn: async () => {
      const roadmap = await getRoadmapData(id);
      if (!roadmap) {
        throw new Error(`Roadmap with id ${id} not found`);
      }
      return roadmap;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};