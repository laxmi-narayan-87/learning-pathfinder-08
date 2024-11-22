import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Loader2, MessageCircle, X } from "lucide-react";
import Cookies from "js-cookie";

const COOKIE_MESSAGES = "chat_messages";
const COOKIE_CHAT_OPEN = "chat_open";

const LEARNING_TIPS = {
  study: [
    "Break down complex topics into smaller, manageable chunks for better understanding.",
    "Use the Pomodoro Technique: study for 25 minutes, then take a 5-minute break.",
    "Review your notes within 24 hours of learning new material."
  ],
  focus: [
    "Find a quiet study space with minimal distractions.",
    "Take regular breaks to maintain focus and productivity.",
    "Use noise-canceling headphones or background white noise if needed."
  ],
  memory: [
    "Create flashcards for key concepts and review them regularly.",
    "Practice active recall by testing yourself on what you've learned.",
    "Connect new information to things you already know."
  ],
  motivation: [
    "Set specific, measurable learning goals for each study session.",
    "Reward yourself after completing study milestones.",
    "Join study groups or find a study buddy for collaborative learning."
  ],
  understanding: [
    "Create mind maps to visualize connections between different concepts.",
    "Teach what you've learned to others to reinforce your understanding.",
    "Write summaries of what you've learned in your own words."
  ]
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Load saved state from cookies on component mount
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

  // Save state to cookies whenever it changes
  useEffect(() => {
    Cookies.set(COOKIE_MESSAGES, JSON.stringify(messages), { expires: 7 });
  }, [messages]);

  useEffect(() => {
    Cookies.set(COOKIE_CHAT_OPEN, String(isOpen), { expires: 7 });
  }, [isOpen]);

  const findRelevantTip = (question: string) => {
    console.log("Finding relevant tip for question:", question);
    
    const questionLower = question.toLowerCase();
    let category = "understanding"; // default category
    
    if (questionLower.includes("study") || questionLower.includes("learn")) {
      category = "study";
    } else if (questionLower.includes("focus") || questionLower.includes("concentrate")) {
      category = "focus";
    } else if (questionLower.includes("remember") || questionLower.includes("memory")) {
      category = "memory";
    } else if (questionLower.includes("motivat") || questionLower.includes("inspire")) {
      category = "motivation";
    }
    
    console.log("Selected category:", category);
    const categoryTips = LEARNING_TIPS[category];
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Generating learning advice...");
      // Simulate API delay for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const relevantTip = findRelevantTip(userMessage);
      console.log("Selected learning tip:", relevantTip);
      
      setMessages((prev) => [...prev, { role: "bot", content: relevantTip }]);
    } catch (error) {
      console.error("Error generating learning advice:", error);
      
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
      {/* Toggle Button */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Learning Assistant</h3>
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
                placeholder="Ask about learning strategies..."
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
