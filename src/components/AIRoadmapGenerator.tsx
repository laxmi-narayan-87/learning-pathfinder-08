import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";
import { generateRoadmap } from "@/utils/aiUtils";
import { UserPreferences } from "@/types/user";
import { useNavigate } from "react-router-dom";

interface AIRoadmapGeneratorProps {
  onRoadmapGenerated: (roadmap: any) => void;
  initialPreferences?: UserPreferences;
}

const AIRoadmapGenerator = ({ onRoadmapGenerated, initialPreferences }: AIRoadmapGeneratorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    skillLevel: "beginner",
    careerGoal: "",
    learningStyle: initialPreferences?.learningStyle || "visual",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const roadmap = await generateRoadmap(formData);
      onRoadmapGenerated(roadmap);
      
      // Determine which roadmap to navigate to based on career goal
      const careerGoal = formData.careerGoal.toLowerCase();
      let roadmapId = 'frontend'; // default roadmap

      if (careerGoal.includes('backend') || careerGoal.includes('server')) {
        roadmapId = 'backend';
      } else if (careerGoal.includes('full stack') || careerGoal.includes('fullstack')) {
        roadmapId = 'fullstack';
      } else if (careerGoal.includes('mobile') || careerGoal.includes('app')) {
        roadmapId = 'mobile';
      } else if (careerGoal.includes('devops') || careerGoal.includes('cloud')) {
        roadmapId = 'devops';
      } else if (careerGoal.includes('scraping') || careerGoal.includes('automation')) {
        roadmapId = 'webscraping';
      }

      toast({
        title: "Roadmap Generated!",
        description: "Navigating to your personalized learning path...",
      });

      // Navigate to the appropriate roadmap
      navigate(`/roadmap/${roadmapId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Skill Level</h3>
          <RadioGroup
            value={formData.skillLevel}
            onValueChange={(value) =>
              setFormData({ ...formData, skillLevel: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="careerGoal">Career Goal</Label>
          <Textarea
            id="careerGoal"
            placeholder="Describe your career goals and what you want to learn..."
            value={formData.careerGoal}
            onChange={(e) =>
              setFormData({ ...formData, careerGoal: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Learning Style</h3>
          <RadioGroup
            value={formData.learningStyle}
            onValueChange={(value: "visual" | "practical" | "theoretical") =>
              setFormData({ ...formData, learningStyle: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visual" id="visual" />
              <Label htmlFor="visual">Visual Learning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="practical" id="practical" />
              <Label htmlFor="practical">Practical Projects</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="theoretical" id="theoretical" />
              <Label htmlFor="theoretical">Theoretical Study</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Roadmap...
            </>
          ) : (
            "Generate Personalized Roadmap"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default AIRoadmapGenerator;