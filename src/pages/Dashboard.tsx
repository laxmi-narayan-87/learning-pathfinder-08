import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserProgress } from "@/hooks/useUserProgress";

const Dashboard = () => {
  const navigate = useNavigate();
  const { progress, getRecommendedContent } = useUserProgress();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const { nextTopics, recommendedResources } = getRecommendedContent();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Learning Dashboard</h1>
        <div className="space-x-4">
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Current Level</p>
              <p className="text-lg font-medium capitalize">{progress.currentLevel}</p>
            </div>
            <div>
              <p className="text-gray-600">Completed Topics</p>
              <p className="text-lg font-medium">{progress.completedTopics.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Next Steps</h2>
          <div className="space-y-4">
            {nextTopics.map((topic, index) => (
              <Link 
                key={index}
                to={`/roadmap/${topic}`}
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium capitalize">{topic.replace(/-/g, ' ')}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedResources.map((resource, index) => (
            <Card key={index} className="p-4">
              <p className="font-medium capitalize">{resource.replace(/-/g, ' ')}</p>
              <Link 
                to={`/roadmap/${resource}`}
                className="text-blue-500 hover:underline text-sm"
              >
                View Details →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;