import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export const useRoadmapNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigateToRoadmap = (careerGoal: string) => {
    // Convert career goal to a valid roadmap path
    const roadmapPath = careerGoal.toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove special characters

    // Map common career goals to predefined roadmap paths
    const roadmapMapping: { [key: string]: string } = {
      'frontend': 'frontend',
      'frontend-development': 'frontend',
      'backend': 'backend',
      'backend-development': 'backend',
      'fullstack': 'fullstack',
      'full-stack': 'fullstack',
      'full-stack-development': 'fullstack',
      'devops': 'devops',
      'mobile': 'mobile',
      'mobile-development': 'mobile',
      'web-scraping': 'webscraping',
    };

    // Use mapped path or fallback to frontend
    const finalPath = roadmapMapping[roadmapPath] || 'frontend';
    
    // Show success toast
    toast({
      title: "Roadmap Generated!",
      description: "Your personalized learning path has been generated.",
    });

    // Navigate to the roadmap view with the determined path
    navigate(`/roadmap/${finalPath}`);
  };

  return { navigateToRoadmap };
};