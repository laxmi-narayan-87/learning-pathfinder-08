import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { frontendRoadmap } from "../data/roadmaps/frontend";
import { backendRoadmap } from "../data/roadmaps/backend";
import { webscrapingRoadmap } from "../data/roadmaps/webscraping";
import { Json } from "@/integrations/supabase/types";

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

const isSection = (section: unknown): section is Section => {
  if (typeof section !== 'object' || section === null) return false;
  const s = section as any;
  return typeof s.title === 'string' && Array.isArray(s.topics) && 
         s.topics.every(topic => typeof topic === 'string');
};

const isSectionArray = (sections: unknown): sections is Section[] => {
  return Array.isArray(sections) && sections.every(isSection);
};

const parseSections = (jsonSections: Json): Section[] => {
  if (!isSectionArray(jsonSections)) {
    console.error('Invalid sections format:', jsonSections);
    return [];
  }
  return jsonSections;
};

const getRoadmapData = async (id: string): Promise<Roadmap | null> => {
  try {
    console.log('Fetching roadmap data for:', id);
    const { data: roadmapData, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('title', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching roadmap:', error);
      throw error;
    }

    if (roadmapData) {
      console.log('Found roadmap data:', roadmapData);
      const sections = parseSections(roadmapData.sections);
      
      return {
        id: roadmapData.id,
        title: roadmapData.title,
        description: roadmapData.description || '',
        sections,
        resources: []
      };
    }

    // Fallback to static data if no dynamic roadmap exists
    console.log('No dynamic roadmap found, falling back to static data');
    switch (id) {
      case "frontend":
        return frontendRoadmap;
      case "backend":
        return backendRoadmap;
      case "webscraping":
        return webscrapingRoadmap;
      default:
        console.log('No static roadmap found for:', id);
        return null;
    }
  } catch (error) {
    console.error('Error in getRoadmapData:', error);
    throw error;
  }
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      try {
        console.log('Fetching all roadmaps');
        const { data: dynamicRoadmaps, error } = await supabase
          .from('roadmaps')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching roadmaps:', error);
          throw error;
        }

        // Transform and validate the dynamic roadmaps
        const transformedDynamicRoadmaps = (dynamicRoadmaps || []).map(roadmap => ({
          ...roadmap,
          sections: parseSections(roadmap.sections),
          resources: []
        }));

        const staticRoadmaps = [frontendRoadmap, backendRoadmap, webscrapingRoadmap];

        return {
          categories: {
            beginner: {
              title: "Learning Paths",
              description: "Curated roadmaps for different skill levels",
              roadmaps: [...transformedDynamicRoadmaps, ...staticRoadmaps]
            }
          },
          roadmaps: [...transformedDynamicRoadmaps, ...staticRoadmaps]
        };
      } catch (error) {
        console.error('Error in useRoadmaps:', error);
        throw error;
      }
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
    retry: 1, // Only retry once if the request fails
  });
};