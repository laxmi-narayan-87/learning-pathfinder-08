import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Loader2, MessageCircle, X, Upload } from "lucide-react";
import Cookies from "js-cookie";
import { useRoadmaps } from "../hooks/useRoadmaps";
import { extractQAFromPDF, type QAEntry } from "../utils/pdfUtils";
import { findBestMatch } from "../utils/pdfUtils";

const COOKIE_MESSAGES = "chat_messages";
const COOKIE_CHAT_OPEN = "chat_open";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [qaKnowledgeBase, setQaKnowledgeBase] = useState<QAEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const qaList = await extractQAFromPDF(buffer);
      setQaKnowledgeBase(qaList);
      
      toast({
        title: "PDF Uploaded Successfully",
        description: `Loaded ${qaList.length} Q&A pairs from the PDF.`,
      });
      
      setMessages(prev => [...prev, {
        role: "bot",
        content: "I've loaded the new knowledge base. How can I help you?"
      }]);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Error",
        description: "Failed to process the PDF file. Please make sure it's in the correct format.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      let response: string;
      
      // First check if we have a knowledge base to use
      if (qaKnowledgeBase.length > 0) {
        response = findBestMatch(userMessage, qaKnowledgeBase);
      } else {
        // Fallback to original roadmap-based responses
        console.log("No knowledge base found, using default response generation");
        response = "Please upload a PDF with Q&A content first, or ask about our learning roadmaps.";
      }
      
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
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chat Assistant</h3>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload PDF
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf"
              onChange={handlePDFUpload}
            />
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