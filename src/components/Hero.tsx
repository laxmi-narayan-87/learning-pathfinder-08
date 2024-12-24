import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4 text-white">
          <div className="flex items-center space-x-8">
            <Link to="/about" className="text-xl font-bold hover:text-white/80 transition-colors">
              SkillForge Academy
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/roadmaps" className="hover:text-white/80">
                Roadmaps
              </Link>
              <Link to="/teams" className="hover:text-white/80">
                Teams
              </Link>
              <Link to="/changelog" className="hover:text-white/80">
                Changelog
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button className="bg-[#F97316] hover:bg-[#f97316]/90 text-white">
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#F97316] hover:bg-[#f97316]/90 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="py-20 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Developer Roadmaps and Learning Paths
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8">
            Community-driven roadmaps, learning paths, and resources for self-guided developers. 
            Choose your path and start your development journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to={isAuthenticated ? "/dashboard" : "/roadmaps"}>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                {isAuthenticated ? "Go to Dashboard" : "View All Roadmaps"}
              </Button>
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;