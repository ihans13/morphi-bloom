import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface SavedChat {
  id: string;
  title: string;
  summary: string;
  date: string;
  messages: Message[];
}

const ChatHistory = () => {
  const navigate = useNavigate();
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);

  useEffect(() => {
    const loadChatHistory = () => {
      const saved = localStorage.getItem('chatHistory');
      if (saved) {
        setSavedChats(JSON.parse(saved));
      }
    };
    loadChatHistory();
  }, []);

  const handleBack = () => {
    navigate('/chat');
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/transcript/${chatId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="h-screen relative bg-gradient-to-br from-[#7B6B97] via-[#8B7BA7] to-[#9B8BB7] overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/lovable-uploads/b491f3f6-01f6-4b5b-b3e6-ed2e0d5124e9.png')"
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pt-12">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="bg-[#39403B]/80 text-white hover:bg-[#39403B]/90 rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <h1 className="text-white text-xl font-semibold">Chat History</h1>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Chat History Content */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          {savedChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-white/10 rounded-full p-6 mb-4">
                <Calendar size={32} className="text-white" />
              </div>
              <h2 className="text-white text-lg font-medium mb-2">No saved chats yet</h2>
              <p className="text-white/70 text-sm">Your saved conversations will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedChats.map((chat) => (
                <Card 
                  key={chat.id} 
                  className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-white"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#39403B] text-base mb-2 line-clamp-2">
                      {chat.title}
                    </h3>
                    <p className="text-sm text-[#39403B]/70 mb-3 line-clamp-3">
                      {chat.summary}
                    </p>
                    <div className="flex items-center text-xs text-[#39403B]/60">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(chat.date)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;