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
import { saveUserToSheet } from "@/utils/googleSheets";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save user data to Google Sheets
      await saveUserToSheet(formData);
      
      toast({
        title: "Success!",
        description: "Account created successfully. Please complete your profile.",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                  name="firstName"
                  placeholder="First name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="tel"
                name="mobile"
                placeholder="Mobile number"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Create password"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                onChange={handleChange}
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