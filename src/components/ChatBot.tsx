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
  
  // Check if the question is about roadmaps
  if (questionLower.includes("roadmap") || questionLower.includes("learn")) {
    // Extract the subject from the question
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
  }
  
  // Default responses for other types of questions
  if (questionLower.includes("hello") || questionLower.includes("hi")) {
    return "Hello! I can help you find learning roadmaps and courses. What subject are you interested in?";
  }
  
  if (questionLower.includes("thank")) {
    return "You're welcome! Let me know if you need any other information about courses or learning paths.";
  }
  
  return "I can help you find learning roadmaps and courses. Try asking about specific subjects like 'data science roadmap' or 'web development courses'.";
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
