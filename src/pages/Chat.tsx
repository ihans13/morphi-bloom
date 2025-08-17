import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreHorizontal, X } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "morphi",
      content: "Hi Isha! I'm here to listen, help you understand your symptoms and navigate this journey. How are you doing today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage("");
    
    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, {
      id: userMsgId,
      sender: "user",
      content: userMessage,
      timestamp: new Date()
    }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMsgId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: botMsgId,
        sender: "morphi",
        content: "Thank you for sharing. I'm here to support you through your perimenopause journey. Tell me more about what you're experiencing.",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div 
      className="flex flex-col h-screen relative"
      style={{
        backgroundImage: `url('/lovable-uploads/b491f3f6-01f6-4b5b-b3e6-ed2e0d5124e9.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Full Width Header Background */}
      <div className="absolute inset-x-0 top-0 bg-white/40 shadow-lg backdrop-blur-sm" style={{ height: '148px' }}></div>
      
      {/* Header Content */}
      <div className="relative z-10 p-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6 pt-4">
            <Button variant="ghost" size="sm" className="bg-[#39403B]/80 text-white hover:bg-[#39403B]/90 rounded-full w-10 h-10 p-0">
              <MoreHorizontal size={20} />
            </Button>
            
            {/* Morphi Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-2xl">
              😊
            </div>
            
            <Button variant="ghost" size="sm" className="bg-[#39403B]/80 text-white hover:bg-[#39403B]/90 rounded-full w-10 h-10 p-0">
              <X size={20} />
            </Button>
          </div>

          {/* Title */}
          <div className="mb-8">
            <p className="text-[#39403B] text-sm font-medium">
              I'm Morphi, your perimenopause<br />
              and menopause companion
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 space-y-6 overflow-y-auto max-w-md mx-auto w-full pb-20">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {/* Message Label */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                msg.sender === "morphi" ? "bg-[#39403B]" : "bg-[#BD7A54]"
              }`}></div>
              <span className="text-sm font-medium text-[#39403B]">
                {msg.sender === "morphi" ? "Morphi" : "You"}
              </span>
            </div>
            
            {/* Message Content */}
            <div className="ml-5">
              <p className="text-sm text-[#39403B] leading-relaxed">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 max-w-md mx-auto w-full">
        <div className="relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts here"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-white/80 backdrop-blur-sm border-gray-200 rounded-2xl pr-12 py-3 text-sm placeholder:text-[#39403B]/60 text-[#39403B]"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#39403B]/60 hover:text-[#39403B] p-2"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;