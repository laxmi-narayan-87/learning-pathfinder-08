import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useRoadmapNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToRoadmap = (careerGoal: string) => {
    const goal = careerGoal.toLowerCase();
    let roadmapId = 'frontend'; // default roadmap

    if (goal.includes('backend') || goal.includes('server')) {
      roadmapId = 'backend';
    } else if (goal.includes('full stack') || goal.includes('fullstack')) {
      roadmapId = 'fullstack';
    } else if (goal.includes('mobile') || goal.includes('app')) {
      roadmapId = 'mobile';
    } else if (goal.includes('devops') || goal.includes('cloud')) {
      roadmapId = 'devops';
    } else if (goal.includes('scraping') || goal.includes('automation')) {
      roadmapId = 'webscraping';
    }

    toast({
      title: "Roadmap Generated!",
      description: "Navigating to your personalized learning path...",
    });

    navigate(`/roadmap/${roadmapId}`);
  };

  return { navigateToRoadmap };
};