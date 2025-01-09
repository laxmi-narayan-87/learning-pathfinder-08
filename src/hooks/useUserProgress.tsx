import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserProgress, UserPreferences } from "@/types/user";

const STORAGE_KEY_PREFERENCES = "user_preferences";

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => ({
    completedTopics: [],
    currentLevel: "beginner",
    interests: [],
    lastActivity: new Date(),
  }));

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

  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('user_progress')
        .select('completed_topics')
        .eq('roadmap_id', window.location.pathname.split('/').pop())
        .maybeSingle();

      if (error) {
        console.error('Error fetching progress:', error);
        toast({
          title: "Error fetching progress",
          description: "There was an error loading your progress.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setProgress(prev => ({
          ...prev,
          completedTopics: data.completed_topics || [],
        }));
      }
    };

    fetchUserProgress();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setProgress(prev => ({ ...prev, completedTopics: [] }));
      } else if (event === 'SIGNED_IN') {
        fetchUserProgress();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferences));
  }, [preferences]);

  const markTopicComplete = async (topicId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const roadmapId = window.location.pathname.split('/').pop() || '';

    setProgress(prev => ({
      ...prev,
      completedTopics: [...prev.completedTopics, topicId],
      lastActivity: new Date(),
    }));

    if (session?.user) {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: session.user.id,
          roadmap_id: roadmapId,
          completed_topics: [...progress.completedTopics, topicId],
        }, {
          onConflict: 'user_id,roadmap_id'
        });

      if (error) {
        console.error('Error saving progress:', error);
        toast({
          title: "Error saving progress",
          description: "There was an error saving your progress.",
          variant: "destructive",
        });
      }
    }
  };

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
  };

  const getRecommendedContent = () => {
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