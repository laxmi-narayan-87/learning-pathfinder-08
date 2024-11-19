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

interface Message {
  role: "user" | "assistant";
  content: string;
}

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

    // Simulate bot response based on keywords
    setTimeout(() => {
      let response = "I'm not sure about that. Could you be more specific about what you'd like to learn?";
      
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("web") || lowercaseInput.includes("website")) {
        response = "For web development, I recommend starting with our Web Development roadmap. It covers HTML, CSS, JavaScript, and modern frameworks like React.";
      } else if (lowercaseInput.includes("data") || lowercaseInput.includes("analytics")) {
        response = "Our Data Science roadmap would be perfect for you! It covers Python, statistics, machine learning, and data visualization.";
      } else if (lowercaseInput.includes("mobile") || lowercaseInput.includes("app")) {
        response = "Check out our Mobile Development roadmap to learn about iOS and Android development, including React Native and Flutter.";
      } else if (lowercaseInput.includes("ai") || lowercaseInput.includes("machine learning")) {
        response = "Our AI/Machine Learning roadmap covers Python, mathematics, neural networks, and practical ML applications.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 1000);
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