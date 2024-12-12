import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { UserPreferences } from "@/types/user";

const PreferencesForm = ({
  onSave,
  initialPreferences,
}: {
  onSave: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences>(
    initialPreferences || {
      learningStyle: "visual",
      hoursPerWeek: 5,
      goals: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(preferences);
    toast({
      title: "Preferences saved",
      description: "Your learning preferences have been updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Learning Style</h3>
        <RadioGroup
          value={preferences.learningStyle}
          onValueChange={(value: "visual" | "practical" | "theoretical") =>
            setPreferences({ ...preferences, learningStyle: value })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visual" id="visual" />
            <Label htmlFor="visual">Visual Learning</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="practical" id="practical" />
            <Label htmlFor="practical">Practical Exercises</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="theoretical" id="theoretical" />
            <Label htmlFor="theoretical">Theoretical Study</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursPerWeek">Hours per week for learning</Label>
        <Input
          id="hoursPerWeek"
          type="number"
          min="1"
          max="40"
          value={preferences.hoursPerWeek}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              hoursPerWeek: parseInt(e.target.value) || 1,
            })
          }
        />
      </div>

      <Button type="submit">Save Preferences</Button>
    </form>
  );
};

export default PreferencesForm;