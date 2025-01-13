import { useParams, Link } from "react-router-dom";
import { useRoadmap } from "@/hooks/useRoadmaps";
import { useQuery } from "@tanstack/react-query";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateRoadmap } from "@/utils/aiUtils";
import RoadmapHeader from "@/components/roadmap/RoadmapHeader";
import RoadmapProgress from "@/components/roadmap/RoadmapProgress";
import RoadmapContent from "@/components/roadmap/RoadmapContent";

const RoadmapView = () => {
  const { id } = useParams();
  const { data: roadmap, isLoading, error, refetch } = useRoadmap(id || "");
  const { progress, preferences, updatePreferences } = useUserProgress();
  const { toast } = useToast();

  const { data: topCourses } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchTopCourses(id || ""),
    enabled: !!id
  });

  const getRoadmapImage = (id: string) => {
    switch (id.toLowerCase()) {
      case "frontend":
        return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
      case "backend":
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
      case "fullstack":
        return "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
      case "devops":
        return "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7";
      case "mobile":
        return "https://images.unsplash.com/photo-1483058712412-4245e9b90334";
      default:
        return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
    }
  };

  const handleRegenerateRoadmap = async () => {
    if (!roadmap) return;

    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      toast({
        title: "Error",
        description: "You must be logged in to regenerate roadmaps.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newRoadmap = await generateRoadmap({
        skillLevel: progress.currentLevel || "beginner",
        careerGoal: roadmap.title,
        learningStyle: preferences?.learningStyle || "visual"
      });

      const { error } = await supabase
        .from('roadmaps')
        .insert({
          title: roadmap.title,
          description: roadmap.description,
          sections: newRoadmap.sections,
          user_id: user.data.user.id
        });

      if (error) throw error;

      toast({
        title: "Roadmap Regenerated!",
        description: "Your learning path has been updated with new content.",
      });

      refetch();
    } catch (error) {
      console.error('Error regenerating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate roadmap. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
        <Link to="/" className="text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  const totalTopics = roadmap.sections.reduce((acc, section) => acc + section.topics.length, 0);

  const fetchTopCourses = async (topic: string) => {
    if (topic === "devops") {
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
    }
    
    if (topic === "mobile") {
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
    }

    if (topic === "fullstack") {
      return [
        {
          id: "1",
          title: "The Complete Web Developer Bootcamp",
          platform: "Udemy",
          rating: 4.8,
          url: "https://udemy.com/complete-web-developer"
        },
        {
          id: "2",
          title: "Full Stack Open",
          platform: "University of Helsinki",
          rating: 4.9,
          url: "https://fullstackopen.com"
        },
        {
          id: "3",
          title: "The Odin Project",
          platform: "The Odin Project",
          rating: 4.9,
          url: "https://www.theodinproject.com"
        }
      ];
    }

    if (topic === "frontend") {
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
    }

    if (topic === "backend") {
      return [
        {
          id: "1",
          title: "Node.js: The Complete Guide",
          platform: "Udemy",
          rating: 4.8,
          url: "https://udemy.com/nodejs-complete"
        },
        {
          id: "2",
          title: "SQL and PostgreSQL: The Complete Developer's Guide",
          platform: "Udemy",
          rating: 4.9,
          url: "https://udemy.com/sql-postgresql"
        },
        {
          id: "3",
          title: "API Design in Node.js",
          platform: "Frontend Masters",
          rating: 4.8,
          url: "https://frontendmasters.com/api-design-nodejs"
        }
      ];
    }

    // Default courses for other topics
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RoadmapHeader
        title={roadmap.title}
        description={roadmap.description}
        onRegenerate={handleRegenerateRoadmap}
      />
      
      <div className="container mx-auto py-8">
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
          <img
            src={getRoadmapImage(id || "")}
            alt={`${roadmap.title} roadmap`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl font-bold text-white mb-2">{roadmap.title}</h2>
              <p className="text-gray-200">{roadmap.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <RoadmapProgress
        completedTopics={progress.completedTopics}
        totalTopics={totalTopics}
      />
      
      <RoadmapContent
        resources={roadmap.resources}
        topCourses={topCourses || []}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
      />
    </div>
  );
};

export default RoadmapView;