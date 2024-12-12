import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Award, Star, GraduationCap } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface SkillAssessmentProps {
  topic: string;
  questions: Question[];
  onComplete?: () => void;
}

export const SkillAssessment = ({ topic, questions, onComplete }: SkillAssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job on this question!",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Keep practicing!",
        variant: "destructive",
      });
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getSkillLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { text: "Expert", icon: Award };
    if (percentage >= 60) return { text: "Intermediate", icon: Star };
    return { text: "Beginner", icon: GraduationCap };
  };

  if (showResults) {
    const skillLevel = getSkillLevel();
    const SkillIcon = skillLevel.icon;

    return (
      <Card className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Assessment Complete!</h3>
        <div className="flex items-center justify-center mb-4">
          <SkillIcon className="w-8 h-8 text-primary mr-2" />
          <span className="text-xl">{skillLevel.text}</span>
        </div>
        <p className="text-lg mb-4">
          You scored {score} out of {questions.length}
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResults(false);
            }}
          >
            Retake Assessment
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onComplete?.();
            }}
          >
            Complete Topic
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">
        {topic} - Question {currentQuestion + 1} of {questions.length}
      </h3>
      <p className="mb-6">{questions[currentQuestion].text}</p>
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-left justify-start"
            onClick={() => handleAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </div>
    </Card>
  );
};