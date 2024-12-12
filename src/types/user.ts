export interface UserProgress {
  completedTopics: string[];
  currentLevel: "beginner" | "intermediate" | "advanced";
  interests: string[];
  lastActivity: Date;
}

export interface UserPreferences {
  learningStyle: "visual" | "practical" | "theoretical";
  hoursPerWeek: number;
  goals: string[];
}