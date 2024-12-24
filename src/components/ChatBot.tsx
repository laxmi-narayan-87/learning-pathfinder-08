import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Loader2, MessageCircle, X } from "lucide-react";
import Cookies from "js-cookie";
import { useRoadmaps } from "../hooks/useRoadmaps";

const COOKIE_MESSAGES = "chat_messages";
const COOKIE_CHAT_OPEN = "chat_open";

const generateResponse = (question: string, roadmapsData: any): string => {
  console.log("Generating response for:", question);
  const questionLower = question.toLowerCase();
  
  // About SkillForge Academy
  if (questionLower.includes("about") || questionLower.includes("skillforge") || questionLower.includes("academy")) {
    if (questionLower.includes("mission") || questionLower.includes("purpose")) {
      return "SkillForge Academy is dedicated to providing comprehensive, community-driven roadmaps and learning resources for developers at all stages of their journey. We believe in making quality education accessible and structured.";
    }
    
    if (questionLower.includes("offer") || questionLower.includes("provide") || questionLower.includes("features")) {
      return "SkillForge Academy offers:\n- Customized learning paths for different technology stacks\n- Community-driven content and resources\n- Interactive roadmaps with progress tracking\n- Expert-curated learning materials\n- Collaborative learning environment";
    }
    
    if (questionLower.includes("why") || questionLower.includes("benefit") || questionLower.includes("choose")) {
      return "Here's why you should choose SkillForge Academy:\n1. Structured Learning: Clear, step-by-step paths to master new technologies\n2. Community Support: Learn alongside peers and get help when needed\n3. Updated Content: Stay current with latest industry trends\n4. Progress Tracking: Monitor your learning journey effectively";
    }
    
    return "SkillForge Academy is your premier platform for structured learning paths and developer education. We offer customized roadmaps, community support, and expert-curated content. What specific aspect would you like to know more about?";
  }
  
  // Check if the question is about roadmaps
  if (questionLower.includes("roadmap") || questionLower.includes("learn") || questionLower.includes("path")) {
    const roadmaps = roadmapsData?.roadmaps || [];
    const subjects = roadmaps.map(r => r.title.toLowerCase());
    const matchedSubject = subjects.find(subject => questionLower.includes(subject));
    
    if (matchedSubject) {
      const roadmap = roadmaps.find(r => r.title.toLowerCase() === matchedSubject);
      if (roadmap) {
        const coursesList = roadmap.courses
          ? roadmap.courses
              .slice(0, 3)
              .map(course => `\n- ${course.title} (${course.platform}, Rating: ${course.rating})`)
              .join("")
          : "";
        
        return `Here's a roadmap for ${roadmap.title}:\n${roadmap.description}\n\nTop recommended courses:${coursesList}\n\nWould you like more specific information about any of these courses?`;
      }
    }
    
    return "We offer various learning roadmaps tailored to different technology stacks. Each roadmap provides a structured path with curated resources. What specific technology or skill are you interested in learning?";
  }
  
  // Community and Support
  if (questionLower.includes("community") || questionLower.includes("help") || questionLower.includes("support")) {
    return "Our community is here to support your learning journey! You can:\n- Connect with fellow learners\n- Get help with technical questions\n- Share your progress and experiences\n- Participate in discussions\n\nWould you like to know more about our community features?";
  }
  
  // Progress Tracking
  if (questionLower.includes("progress") || questionLower.includes("track") || questionLower.includes("monitor")) {
    return "SkillForge Academy provides built-in progress tracking features that help you:\n- Monitor your learning journey\n- Set and achieve learning goals\n- Track completion of roadmap sections\n- Visualize your growth\n\nWould you like to know how to start tracking your progress?";
  }
  
  // Default responses
  if (questionLower.includes("hello") || questionLower.includes("hi")) {
    return "Hello! Welcome to SkillForge Academy. I'm here to help you with information about our learning roadmaps, courses, and community. What would you like to know more about?";
  }
  
  if (questionLower.includes("thank")) {
    return "You're welcome! Remember, SkillForge Academy is here to support your learning journey. Don't hesitate to ask if you need any other information about our roadmaps, courses, or community features.";
  }
  
  return "I'm here to help you learn about SkillForge Academy and our learning resources. You can ask about:\n- Our learning roadmaps and courses\n- Community features and support\n- Progress tracking\n- Why choose SkillForge Academy\n\nWhat would you like to know more about?";
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { data: roadmaps } = useRoadmaps();

  useEffect(() => {
    const savedMessages = Cookies.get(COOKIE_MESSAGES);
    const savedChatOpen = Cookies.get(COOKIE_CHAT_OPEN);
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Error parsing saved messages:", e);
      }
    }
    
    if (savedChatOpen) {
      setIsOpen(savedChatOpen === "true");
    }
  }, []);

  useEffect(() => {
    Cookies.set(COOKIE_MESSAGES, JSON.stringify(messages), { expires: 7 });
  }, [messages]);

  useEffect(() => {
    Cookies.set(COOKIE_CHAT_OPEN, String(isOpen), { expires: 7 });
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Processing user message:", userMessage);
      // Simulate API delay for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = generateResponse(userMessage, roadmaps || []);
      console.log("Generated response:", response);
      
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Chat Assistant</h3>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="resize-none"
                rows={2}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
