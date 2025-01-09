import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SkillLevelSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const SkillLevelSection = ({ value, onChange }: SkillLevelSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Skill Level</h3>
      <RadioGroup value={value} onValueChange={onChange}>
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
  );
};

export default SkillLevelSection;