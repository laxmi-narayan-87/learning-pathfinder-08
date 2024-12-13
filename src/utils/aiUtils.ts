import { Configuration, OpenAIApi } from "openai";

interface RoadmapInput {
  skillLevel: string;
  careerGoal: string;
  learningStyle: string;
}

export const generateRoadmap = async (input: RoadmapInput) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Create a detailed learning roadmap for a ${input.skillLevel} level student interested in ${input.careerGoal}. 
    They prefer ${input.learningStyle} learning style. 
    Format the response as a JSON object with sections and topics.`;

  try {
    const completion = await openai.createCompletion({
      model: "gpt-4",
      prompt: prompt,
      max_tokens: 1000,
    });

    return JSON.parse(completion.data.choices[0].text || "{}");
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};