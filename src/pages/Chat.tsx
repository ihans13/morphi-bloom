import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, MoreHorizontal, X, History, Info } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
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

  const generateChatTitle = (messages: any[]) => {
    const userMessages = messages.filter(msg => msg.sender === "user");
    if (userMessages.length > 0) {
      const firstMessage = userMessages[0].content;
      // Truncate and clean up the title
      const title = firstMessage.length > 50 
        ? firstMessage.substring(0, 50) + "..."
        : firstMessage;
      return title;
    }
    return "Chat with Morphi";
  };

  const generateChatSummary = (messages: any[]) => {
    const userMessages = messages.filter(msg => msg.sender === "user");
    if (userMessages.length === 0) return "Initial conversation with Morphi";
    
    if (userMessages.length === 1) {
      return `Discussed: ${userMessages[0].content.substring(0, 100)}${userMessages[0].content.length > 100 ? "..." : ""}`;
    }
    
    return `Conversation covering ${userMessages.length} topics including symptoms, experiences, and guidance from Morphi.`;
  };

  const handleSaveChat = () => {
    if (messages.length <= 1) {
      toast({
        title: "Nothing to save",
        description: "Start a conversation first before saving.",
        variant: "destructive"
      });
      return;
    }

    const chatId = Date.now().toString();
    const title = generateChatTitle(messages);
    const summary = generateChatSummary(messages);
    
    const savedChat = {
      id: chatId,
      title,
      summary,
      date: new Date().toISOString(),
      messages: messages.map(msg => ({
        content: msg.content,
        sender: msg.sender === "morphi" ? "bot" : msg.sender,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    // Get existing chat history
    const existingChats = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const updatedChats = [savedChat, ...existingChats];
    
    // Save to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(updatedChats));
    
    toast({
      title: "Chat saved!",
      description: "Your conversation has been saved to chat history."
    });
    
    setExitDialogOpen(false);
  };

  const handleExit = () => {
    navigate('/');
  };

  const handleChatHistory = () => {
    setDrawerOpen(false);
    navigate('/chat/history');
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
      <div className="absolute inset-x-0 top-0 bg-white/40 shadow-lg backdrop-blur-sm" style={{ height: '160px' }}></div>
      
      {/* Header Content */}
      <div className="relative z-10 p-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3 pt-3">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-[#39403B]/80 text-white hover:bg-[#39403B]/90 rounded-full w-10 h-10 p-0">
                  <MoreHorizontal size={20} />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white rounded-t-2xl p-6">
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-[#39403B] hover:bg-gray-100 py-6 text-base font-medium"
                    onClick={handleChatHistory}
                  >
                    <History className="w-5 h-5 mr-3" />
                    Chat history
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-[#39403B] hover:bg-gray-100 py-6 text-base font-medium"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Info className="w-5 h-5 mr-3" />
                    About Morphi
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
            
            {/* Morphi Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-2xl">
              😊
            </div>
            
            <Dialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-[#39403B]/80 text-white hover:bg-[#39403B]/90 rounded-full w-10 h-10 p-0">
                  <X size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-lg p-6 max-w-sm mx-auto">
                <div className="text-center space-y-4">
                  <p className="text-[#39403B] text-base font-medium">
                    Are you sure you don't want to talk more?
                  </p>
                  <p className="text-[#39403B] text-sm">
                    You may save this chat to reference later or exit.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-[#39403B] border-[#39403B]"
                      onClick={handleSaveChat}
                    >
                      Save
                    </Button>
                    <Button 
                      className="flex-1 bg-[#39403B] text-white hover:bg-[#39403B]/90"
                      onClick={handleExit}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Title */}
          <div className="mb-4">
            <p className="text-[#39403B] text-sm font-medium">
              I'm Morphi, your perimenopause<br />
              and menopause companion
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 space-y-6 max-w-md mx-auto w-full" style={{ height: 'calc(100vh - 160px - 5rem - 180px)', overflowY: 'auto' }}>
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
      <div className="p-4 max-w-md mx-auto w-full mb-[90px] relative z-20">
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