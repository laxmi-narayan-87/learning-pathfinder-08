import { GraduationCap, Compass, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:flex lg:items-center lg:gap-x-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              SkillForge Academy
              <span className="text-primary block">Your AI-Powered Learning Journey</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover personalized learning roadmaps with real-time course recommendations from top platforms, tailored just for you.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <button className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Get Started
              </button>
            </div>
          </div>
          <div className="mt-16 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Learning Platform"
              className="rounded-xl shadow-xl ring-1 ring-gray-400/10 animate-float"
              width={600}
              height={400}
            />
          </div>
        </div>
        
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-white p-8 shadow-2xl ring-1 ring-gray-900/10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Personalized Paths</h3>
                  <p className="text-sm text-gray-500">Customized learning journeys based on your goals</p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="rounded-full bg-secondary/10 p-3">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold">Real-time Updates</h3>
                  <p className="text-sm text-gray-500">Live course recommendations from top platforms</p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="rounded-full bg-accent/10 p-3">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold">Expert Curation</h3>
                  <p className="text-sm text-gray-500">AI-powered selection of the best resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;