import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LearningStyleSectionProps {
  value: "visual" | "practical" | "theoretical";
  onChange: (value: "visual" | "practical" | "theoretical") => void;
}

const LearningStyleSection = ({ value, onChange }: LearningStyleSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Learning Style</h3>
      <RadioGroup value={value} onValueChange={onChange}>
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
  );
};

export default LearningStyleSection;