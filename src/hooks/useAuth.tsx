import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAuthErrorMessage } from "@/utils/authErrors";
import type { AuthError } from "@supabase/supabase-js";
import type { AuthFormValues } from "@/schemas/authSchema";

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthError = (error: AuthError) => {
    setIsLoading(false);
    const message = getAuthErrorMessage(error);
    setError(message);
    
    if (message.includes("already registered")) {
      setActiveTab("login");
    }
  };

  const handleSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);
    setError("");
    
    try {
      if (activeTab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          handleAuthError(error);
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          handleAuthError(error);
        } else {
          setError("Please check your email to verify your account.");
        }
      }
    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return {
    error,
    isLoading,
    activeTab,
    setActiveTab,
    handleSubmit,
  };
};