import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const hf = new HfInference("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"); // This is a read-only token

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await hf.textGeneration({
        model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
        inputs: `You are a helpful learning assistant. Help the user with their question: ${userMessage}. Keep the response concise and focused on learning and technology topics.`,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
        },
      });

      setMessages((prev) => [...prev, { role: "bot", content: response.generated_text }]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
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
  );
};

export default ChatBot;