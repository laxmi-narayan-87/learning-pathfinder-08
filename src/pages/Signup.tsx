import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated signup - replace with actual registration logic
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Account created successfully. Please complete your profile.",
      });
      navigate("/profile");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="Mobile number"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Create password"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;