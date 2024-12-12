import { useState, useEffect } from "react";
import { UserProgress, UserPreferences } from "@/types/user";

const STORAGE_KEY_PROGRESS = "user_progress";
const STORAGE_KEY_PREFERENCES = "user_preferences";

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return saved
      ? JSON.parse(saved)
      : {
          completedTopics: [],
          currentLevel: "beginner",
          interests: [],
          lastActivity: new Date(),
        };
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFERENCES);
    return saved
      ? JSON.parse(saved)
      : {
          learningStyle: "visual",
          hoursPerWeek: 5,
          goals: [],
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferences));
  }, [preferences]);

  const markTopicComplete = (topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTopics: [...prev.completedTopics, topicId],
      lastActivity: new Date(),
    }));
  };

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  const getRecommendedContent = () => {
    // Filter and sort content based on user preferences and progress
    return {
      nextTopics: progress.completedTopics.length === 0 
        ? ["html-basics", "css-fundamentals"] 
        : ["javascript-basics", "react-introduction"],
      recommendedResources: preferences.learningStyle === "visual"
        ? ["video-tutorials", "interactive-demos"]
        : ["documentation", "practical-exercises"],
    };
  };

  return {
    progress,
    preferences,
    markTopicComplete,
    updatePreferences,
    getRecommendedContent,
  };
};