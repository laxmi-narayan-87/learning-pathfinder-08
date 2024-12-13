import OpenAI from "openai";

interface RoadmapInput {
  skillLevel: string;
  careerGoal: string;
  learningStyle: string;
}

export const generateRoadmap = async (input: RoadmapInput) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Create a detailed learning roadmap for a ${input.skillLevel} level student interested in ${input.careerGoal}. 
    They prefer ${input.learningStyle} learning style. 
    Format the response as a JSON object with sections and topics.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};