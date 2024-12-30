import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useRoadmaps } from "@/hooks/useRoadmaps";

interface Message {
  text: string;
  isUser: boolean;
  image?: string;
}

const generateResponse = async (question: string, roadmapsData: any) => {
  console.log("Generating response for:", question);
  const questionLower = question.toLowerCase();
  
  // About SkillForge Academy
  if (questionLower.includes("about") || questionLower.includes("skillforge") || questionLower.includes("academy")) {
    if (questionLower.includes("mission") || questionLower.includes("purpose")) {
      return {
        text: "SkillForge Academy is dedicated to providing comprehensive, community-driven roadmaps and learning resources for developers at all stages of their journey. We believe in making quality education accessible and structured.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      };
    }
    
    if (questionLower.includes("offer") || questionLower.includes("provide") || questionLower.includes("features")) {
      return {
        text: "SkillForge Academy offers:\n- Customized learning paths for different technology stacks\n- Community-driven content and resources\n- Interactive roadmaps with progress tracking\n- Expert-curated learning materials\n- Collaborative learning environment",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      };
    }
    
    if (questionLower.includes("why") || questionLower.includes("benefit") || questionLower.includes("choose")) {
      return {
        text: "Here's why you should choose SkillForge Academy:\n1. Structured Learning: Clear, step-by-step paths to master new technologies\n2. Community Support: Learn alongside peers and get help when needed\n3. Updated Content: Stay current with latest industry trends\n4. Progress Tracking: Monitor your learning journey effectively",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
      };
    }
    
    return {
      text: "SkillForge Academy is your premier platform for structured learning paths and developer education. We offer customized roadmaps, community support, and expert-curated content. What specific aspect would you like to know more about?",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    };
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
          .slice(0, 3)
          .map(course => `\n- ${course.title} (${course.platform})`)
          .join("");
        
        return {
          text: `Here's a roadmap for ${roadmap.title}:\n${roadmap.description}\n\nTop recommended courses:${coursesList}\n\nWould you like more specific information about any of these courses?`,
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
        };
      }
    }
    
    return {
      text: "We offer various learning roadmaps tailored to different technology stacks. Each roadmap provides a structured path with curated resources. What specific technology or skill are you interested in learning?",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    };
  }
  
  // Community and Support
  if (questionLower.includes("community") || questionLower.includes("help") || questionLower.includes("support")) {
    return {
      text: "Our community is here to support your learning journey! You can:\n- Connect with fellow learners\n- Get help with technical questions\n- Share your progress and experiences\n- Participate in discussions\n\nWould you like to know more about our community features?",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    };
  }
  
  // Progress Tracking
  if (questionLower.includes("progress") || questionLower.includes("track") || questionLower.includes("monitor")) {
    return {
      text: "SkillForge Academy provides built-in progress tracking features that help you:\n- Monitor your learning journey\n- Set and achieve learning goals\n- Track completion of roadmap sections\n- Visualize your growth\n\nWould you like to know how to start tracking your progress?",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    };
  }
  
  // Default responses
  if (questionLower.includes("hello") || questionLower.includes("hi")) {
    return {
      text: "Hello! Welcome to SkillForge Academy. I'm here to help you with information about our learning roadmaps, courses, and community. What would you like to know more about?",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    };
  }
  
  if (questionLower.includes("thank")) {
    return {
      text: "You're welcome! Remember, SkillForge Academy is here to support your learning journey. Don't hesitate to ask if you need any other information about our roadmaps, courses, or community features.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    };
  }
  
  return {
    text: "I'm here to help you learn about SkillForge Academy and our learning resources. You can ask about:\n- Our learning roadmaps and courses\n- Community features and support\n- Progress tracking\n- Why choose SkillForge Academy\n\nWhat would you like to know more about?",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  };
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your SkillForge Academy assistant. How can I help you today?",
      isUser: false,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ]);
  const [input, setInput] = useState("");
  const { data: roadmapsData } = useRoadmaps();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const response = await generateResponse(input, roadmapsData);
    const botMessage = { 
      text: response.text, 
      isUser: false,
      image: response.image
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg overflow-hidden bg-white">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.image && !message.isUser && (
                  <img
                    src={message.image}
                    alt="Response illustration"
                    className="mt-4 rounded-lg w-full h-48 object-cover"
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;