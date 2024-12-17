import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated profile update - replace with actual update logic
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            Tell us more about yourself to personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input type="date" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Role</label>
                <Input type="text" placeholder="e.g., Software Developer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <Input type="text" placeholder="e.g., JavaScript, React, Node.js" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Learning Preferences</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Learning Goals</label>
                <Textarea placeholder="What do you want to achieve?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Learning Style</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="">Select learning style</option>
                  <option value="visual">Visual</option>
                  <option value="auditory">Auditory</option>
                  <option value="reading">Reading/Writing</option>
                  <option value="kinesthetic">Kinesthetic</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;