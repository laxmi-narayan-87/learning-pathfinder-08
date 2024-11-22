import { useState, useEffect } from "react";
import OpenAI from "openai";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Loader2, MessageCircle, X } from "lucide-react";
import Cookies from "js-cookie";

// Initialize OpenAI with Fireworks API
const FIREWORKS_API_KEY = import.meta.env.VITE_FIREWORKS_API_KEY || "";
const openai = new OpenAI({
  apiKey: FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

const COOKIE_MESSAGES = "chat_messages";
const COOKIE_CHAT_OPEN = "chat_open";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!FIREWORKS_API_KEY) {
      toast({
        title: "Configuration Error",
        description: "Fireworks API key is not configured. Please set the VITE_FIREWORKS_API_KEY environment variable.",
        variant: "destructive",
      });
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Sending request to Fireworks API...");
      const response = await openai.chat.completions.create({
        model: "accounts/fireworks/models/llama-v2-7b-chat",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 150,
        temperature: 0.7,
      });

      console.log("Received response:", response);
      const botMessage = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "bot", content: botMessage }]);
    } catch (error: any) {
      console.error("Error generating response:", error);
      
      let errorMessage = "Failed to generate response. Please try again.";
      if (error.message?.includes("auth")) {
        errorMessage = "Invalid API key. Please check your Fireworks API configuration.";
      }

      toast({
        title: "Error",
        description: errorMessage,
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
                placeholder="Ask a question..."
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