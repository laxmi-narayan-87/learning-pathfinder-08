import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CareerGoalSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const CareerGoalSection = ({ value, onChange }: CareerGoalSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="careerGoal">Career Goal</Label>
      <Textarea
        id="careerGoal"
        placeholder="Describe your career goals and what you want to learn..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
};

export default CareerGoalSection;