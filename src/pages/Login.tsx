import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
      // Clear error when auth state changes
      if (event === "SIGNED_OUT") {
        setError("");
      }
      // Handle auth errors
      if (event === "USER_UPDATED") {
        supabase.auth.getSession().then(({ error }) => {
          if (error) {
            handleAuthError(error);
          }
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthError = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          setError("Invalid email or password. Please check your credentials and try again.");
          break;
        case "email_not_confirmed":
          setError("Please verify your email address before signing in.");
          break;
        case "email_provider_disabled":
          setError("Email sign up is currently disabled. Please contact the administrator.");
          break;
        case "invalid_grant":
          setError("Invalid login credentials.");
          break;
        default:
          setError(error.message);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;