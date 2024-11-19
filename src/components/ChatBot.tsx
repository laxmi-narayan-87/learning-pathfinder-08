import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import OpenAI from "openai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

let openai: OpenAI | null = null;
try {
  if (import.meta.env.VITE_OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
} catch (error) {
  console.error('Error initializing OpenAI:', error);
}

const isRelevantTopic = (input: string): boolean => {
  const relevantKeywords = [
    "web", "website", "development", "programming",
    "data", "analytics", "mobile", "app",
    "ai", "machine learning", "coding", "software",
    "frontend", "backend", "fullstack", "database",
    "javascript", "python", "java", "react",
    "angular", "vue", "node", "express",
    "learning", "study", "course", "roadmap",
    "career", "skill", "technology", "computer"
  ];
  
  return relevantKeywords.some(keyword => 
    input.toLowerCase().includes(keyword)
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I can help you find the right learning roadmap. What skills are you interested in developing?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      if (!openai) {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "I apologize, but I'm currently unable to process requests due to a configuration issue. Please try again later or contact support." 
        }]);
        toast({
          title: "Configuration Error",
          description: "The chatbot is not properly configured. Please ensure the API key is set.",
          variant: "destructive",
        });
        return;
      }

      if (isRelevantTopic(input)) {
        const completion = await openai.chat.completions.create({
          messages: [
            { 
              role: "system", 
              content: "You are a helpful assistant focused on providing guidance about learning roadmaps for technology and programming skills. Keep responses concise and focused on educational paths and skill development." 
            },
            ...messages.map(msg => ({ 
              role: msg.role as "user" | "assistant", 
              content: msg.content 
            })),
            { role: "user", content: input }
          ],
          model: "gpt-4o",
        });

        const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      } else {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "I apologize, but this question appears to be outside my capabilities. I'm specifically trained to help with learning roadmaps and skill development in technology and programming. Could you please ask something related to these topics?" 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[400px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center justify-between">
            SkillForge Assistant
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form
          onSubmit={handleSendMessage}
          className="border-t p-4 flex gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;