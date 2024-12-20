import { GoogleGenerativeAI } from "@google/generative-ai";

interface RoadmapInput {
  skillLevel: string;
  careerGoal: string;
  learningStyle: string;
}

// Demo roadmap for when API key is not available
const getDemoRoadmap = (input: RoadmapInput) => ({
  sections: [
    {
      title: "Getting Started",
      topics: [
        "Basic Concepts",
        "Development Environment Setup",
        "Version Control Basics"
      ]
    },
    {
      title: "Core Skills",
      topics: [
        `${input.skillLevel} Level Programming`,
        "Problem Solving",
        "Data Structures"
      ]
    },
    {
      title: "Advanced Topics",
      topics: [
        "System Design",
        "Best Practices",
        "Industry Standards"
      ]
    }
  ],
  resources: [
    {
      title: "Official Documentation",
      url: "https://docs.example.com",
      type: "documentation"
    },
    {
      title: "Interactive Course",
      url: "https://course.example.com",
      type: "course"
    }
  ]
});

export const generateRoadmap = async (input: RoadmapInput) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no API key is available, return demo roadmap
  if (!apiKey) {
    console.log("No Gemini API key found, using demo roadmap");
    return getDemoRoadmap(input);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Create a detailed learning roadmap for a ${input.skillLevel} level student interested in ${input.careerGoal}. 
    They prefer ${input.learningStyle} learning style. 
    Format the response as a JSON object with sections and topics.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    if (!content) {
      throw new Error("No content received from Gemini");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    // Return demo roadmap as fallback
    return getDemoRoadmap(input);
  }
};