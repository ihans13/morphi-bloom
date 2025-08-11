import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Sparkles } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "morphi",
      content: "Hi! I'm Morphi, your perimenopause companion. I'm here to help you understand your symptoms and navigate this journey. How are you feeling today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: "user",
      content: message,
      timestamp: new Date()
    }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-hero p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-primary-foreground" size={24} />
          <h1 className="text-xl font-bold text-primary-foreground">Morphi</h1>
        </div>
        <p className="text-primary-foreground/90 text-sm">Your AI Perimenopause Companion</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card className={`max-w-[80%] p-3 ${
              msg.sender === "user" 
                ? "bg-gradient-primary text-primary-foreground" 
                : "bg-card border-accent"
            }`}>
              {msg.sender === "morphi" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-medium text-primary">Morphi</span>
                </div>
              )}
              <p className="text-sm">{msg.content}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Morphi about your symptoms..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-200"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;