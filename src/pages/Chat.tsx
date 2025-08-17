import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Send, Sparkles, X, MoreVertical, History, Info, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useConversationState, type Resource } from "@/hooks/useConversationState";
import { ResourceList } from "@/components/ui/resource-tile";

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "morphi",
      content: "Hi! I'm Morphi, your perimenopause companion. I'm here to listen, help you understand your symptoms and navigate this journey. How are you feeling today?",
      timestamp: new Date(),
      resources: undefined,
      showMoreVisible: false
    }
  ]);
  const [showMoreStates, setShowMoreStates] = useState<Record<number, boolean>>({});
  const [pinnedResources, setPinnedResources] = useState<string[]>([]);
  
  const { 
    state: conversationState, 
    processMessage, 
    confirmResourceInterest, 
    continueConversation,
    offerTracking 
  } = useConversationState();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showHistorySheet, setShowHistorySheet] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedChats, setSavedChats] = useState([]);
  
  const { toast } = useToast();

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const loadSavedChats = () => {
      try {
        const stored = localStorage.getItem("morphi_chat_history");
        if (stored) {
          const parsedChats = JSON.parse(stored);
          setSavedChats(parsedChats);
        }
      } catch (error) {
        console.error("Error loading saved chats:", error);
      }
    };
    
    loadSavedChats();
  }, []);

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
      timestamp: new Date(),
      resources: undefined,
      showMoreVisible: false
    }]);
    
    // Process message and get bot response
    setTimeout(() => {
      if (userMessage.toLowerCase().includes('yes') && conversationState.step === 'resource_introduction') {
        // User confirmed interest in resources
        const resources = confirmResourceInterest();
        const botMsgId = Date.now() + 1;
        
        setMessages(prev => [...prev, {
          id: botMsgId,
          sender: "morphi",
          content: "Here's the most relevant resource based on what you've shared:",
          timestamp: new Date(),
          resources: resources,
          showMoreVisible: false
        }]);
      } else {
        // Regular conversation flow
        const botResponse = processMessage(userMessage);
        const botMsgId = Date.now() + 1;
        
        setMessages(prev => [...prev, {
          id: botMsgId,
          sender: "morphi", 
          content: botResponse,
          timestamp: new Date(),
          resources: undefined,
          showMoreVisible: false
        }]);
      }
    }, 500);
  };

  const generateChatTitle = (userMessages: string[]) => {
    const firstMessage = userMessages[0]?.toLowerCase() || "";
    
    // Generate meaningful titles based on keywords
    if (firstMessage.includes("headache") || firstMessage.includes("migraine")) {
      return "Headaches and pain management";
    } else if (firstMessage.includes("hot flash") || firstMessage.includes("sweating")) {
      return "Hot flashes and temperature changes";
    } else if (firstMessage.includes("sleep") || firstMessage.includes("insomnia")) {
      return "Sleep issues and fatigue";
    } else if (firstMessage.includes("mood") || firstMessage.includes("anxious") || firstMessage.includes("depressed")) {
      return "Mood changes and emotional wellness";
    } else if (firstMessage.includes("period") || firstMessage.includes("cycle") || firstMessage.includes("irregular")) {
      return "Menstrual cycle changes";
    } else if (firstMessage.includes("weight") || firstMessage.includes("metabolism")) {
      return "Weight and metabolism concerns";
    } else if (firstMessage.includes("brain fog") || firstMessage.includes("memory") || firstMessage.includes("concentration")) {
      return "Cognitive changes and brain fog";
    } else if (firstMessage.includes("joint") || firstMessage.includes("aches") || firstMessage.includes("stiff")) {
      return "Joint pain and body aches";
    } else {
      return "Perimenopause symptoms discussion";
    }
  };

  const generateMorphiSummary = (chatMessages: any[]) => {
    const userMessages = chatMessages.filter(m => m.sender === "user").map(m => m.content);
    const symptoms: string[] = [];
    const topics: string[] = [];
    
    const allUserText = userMessages.join(" ").toLowerCase();
    
    // Extract symptoms
    if (allUserText.includes("headache") || allUserText.includes("migraine")) symptoms.push("headaches");
    if (allUserText.includes("hot flash") || allUserText.includes("sweating")) symptoms.push("hot flashes");
    if (allUserText.includes("sleep") || allUserText.includes("insomnia")) symptoms.push("sleep issues");
    if (allUserText.includes("mood") || allUserText.includes("anxious") || allUserText.includes("depressed")) symptoms.push("mood changes");
    if (allUserText.includes("period") || allUserText.includes("cycle")) symptoms.push("menstrual changes");
    if (allUserText.includes("weight") || allUserText.includes("metabolism")) symptoms.push("weight concerns");
    if (allUserText.includes("brain fog") || allUserText.includes("memory")) symptoms.push("brain fog");
    if (allUserText.includes("joint") || allUserText.includes("aches")) symptoms.push("joint pain");
    
    // Extract topics
    if (allUserText.includes("work") || allUserText.includes("job")) topics.push("work impacts");
    if (allUserText.includes("family") || allUserText.includes("relationship")) topics.push("family relationships");
    if (allUserText.includes("treatment") || allUserText.includes("medication")) topics.push("treatment options");
    if (allUserText.includes("exercise") || allUserText.includes("diet")) topics.push("lifestyle changes");
    
    const symptomsText = symptoms.length > 0 ? symptoms.join(", ") : "various symptoms";
    const topicsText = topics.length > 0 ? ` and we spoke about ${topics.join(", ")}` : "";
    
    return `You were experiencing ${symptomsText}${topicsText}.`;
  };

  const formatChatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleSaveConversation = () => {
    if (messages.length > 1) {
      const userMessages = messages.filter(m => m.sender === "user").map(m => m.content);
      const chatTitle = generateChatTitle(userMessages);
      const morphiSummary = generateMorphiSummary(messages);
      const chatDate = new Date();
      
      const newChat = {
        id: Date.now().toString(),
        title: chatTitle,
        date: chatDate.toISOString(),
        preview: morphiSummary,
        messages: [...messages],
        createdAt: chatDate
      };
      
      // Update state
      setSavedChats(prev => {
        const updatedChats = [newChat, ...prev];
        // Also save to localStorage
        try {
          localStorage.setItem("morphi_chat_history", JSON.stringify(updatedChats));
        } catch (error) {
          console.error("Error saving chat to localStorage:", error);
        }
        return updatedChats;
      });
      
      toast({
        title: "Conversation saved!",
        description: "You can find it in your chat history anytime.",
      });
    }
    setShowExitDialog(false);
  };

  const handleExitConversation = () => {
    setMessages([{
      id: 1,
      sender: "morphi",
      content: "Hi! I'm Morphi, your perimenopause companion. I'm here to listen, help you understand your symptoms and navigate this journey. How are you feeling today?",
      timestamp: new Date(),
      resources: undefined,
      showMoreVisible: false
    }]);
    setShowExitDialog(false);
  };

  const handlePinResource = (resourceId: string) => {
    setPinnedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleShowMoreToggle = (messageId: number) => {
    setShowMoreStates(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleDeleteChat = (chatId: string) => {
    setSavedChats(prev => {
      const updatedChats = prev.filter(chat => chat.id !== chatId);
      // Also remove from localStorage
      try {
        localStorage.setItem("morphi_chat_history", JSON.stringify(updatedChats));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
      return updatedChats;
    });
  };

  const handleLoadChat = (chat: typeof savedChats[0]) => {
    setMessages(chat.messages);
    setShowHistorySheet(false);
  };

  const filteredChats = savedChats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-hero p-4 relative">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-2">
          {/* Menu Button (Top Left) */}
          <Sheet open={showHistorySheet} onOpenChange={setShowHistorySheet}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                <MoreVertical size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 h-12"
                    >
                      <History size={20} />
                      Chat History
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <History size={20} />
                        Chat History
                      </SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-6 space-y-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search conversations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      {/* Chat List */}
                      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                        {filteredChats.length === 0 ? (
                          <p className="text-muted-foreground text-sm text-center py-8">
                            No conversations found
                          </p>
                        ) : (
                          filteredChats.map((chat) => (
                            <Card 
                              key={chat.id} 
                              className="p-4 hover:bg-accent cursor-pointer"
                              onClick={() => navigate(`/chat/transcript/${chat.id}`)}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-sm font-medium text-foreground leading-tight">
                                  {chat.title}
                                </h3>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {chat.preview}
                              </p>
                               <div className="flex items-center justify-start">
                                 <p className="text-xs text-muted-foreground">
                                   📅 {new Date(chat.date).toLocaleDateString('en-US', {
                                     month: 'short',
                                     day: 'numeric',
                                     year: 'numeric'
                                   })}
                                 </p>
                               </div>
                            </Card>
                          ))
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => {
                    setShowHistorySheet(false);
                    setShowAboutDialog(true);
                  }}
                >
                  <Info size={20} />
                  About Morphi
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Exit Button (Top Right) */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-white/10"
            onClick={() => setShowExitDialog(true)}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-primary-foreground" size={24} />
            <h1 className="text-xl font-bold text-primary-foreground">Morphi</h1>
          </div>
          <p className="text-primary-foreground/90 text-sm">Your AI Perimenopause Companion</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: `url('/lovable-uploads/b491f3f6-01f6-4b5b-b3e6-ed2e0d5124e9.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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
              
              {msg.resources && (
                <div className="mt-3">
                  <ResourceList
                    resources={msg.resources}
                    onPin={handlePinResource}
                    pinnedResources={pinnedResources}
                    showMore={showMoreStates[msg.id] || false}
                    onShowMoreToggle={() => handleShowMoreToggle(msg.id)}
                  />
                </div>
              )}
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

      {/* Exit Conversation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="max-w-sm mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Before you go, would you like to save this conversation? Saved chats help you track your journey and can be referenced later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction 
              onClick={handleSaveConversation}
              className="w-full bg-gradient-primary hover:shadow-glow"
            >
              Save
            </AlertDialogAction>
            <AlertDialogCancel 
              onClick={handleExitConversation}
              className="w-full"
            >
              Exit
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* About Morphi Dialog */}
      <Dialog open={showAboutDialog} onOpenChange={setShowAboutDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              About Morphi
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">What Morphi Is</h4>
              <p className="text-muted-foreground">
                Morphi is your AI companion designed to help you understand perimenopause symptoms and navigate this life transition with confidence and support.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">What Morphi Isn't</h4>
              <p className="text-muted-foreground">
                Morphi is not a replacement for professional medical advice, diagnosis, or treatment. Always consult healthcare professionals for medical concerns.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">How It Works</h4>
              <p className="text-muted-foreground">
                Morphi is trained on clinical data and women's health research to provide evidence-based information and emotional support throughout your perimenopause journey.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Privacy & Data</h4>
              <p className="text-muted-foreground">
                Your conversations are private and secure. We prioritize your confidentiality and never share personal health information.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Support</h4>
              <p className="text-muted-foreground">
                For technical support or feedback, contact us at support@morphi.app
              </p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Version 1.0.0 • Last updated: January 2025
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;