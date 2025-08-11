import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Send, Sparkles, X, MoreVertical, History, Info, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showHistorySheet, setShowHistorySheet] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedChats, setSavedChats] = useState([
    {
      id: 1,
      title: "Today - I have severe headaches and hot flashes...",
      date: "Today",
      preview: "I have severe headaches and hot flashes...",
      messages: []
    }
  ]);
  
  const { toast } = useToast();

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

  const handleSaveConversation = () => {
    if (messages.length > 1) {
      const firstUserMessage = messages.find(m => m.sender === "user")?.content || "New conversation";
      const newChat = {
        id: Date.now(),
        title: `Today - ${firstUserMessage.substring(0, 50)}${firstUserMessage.length > 50 ? "..." : ""}`,
        date: "Today",
        preview: firstUserMessage.substring(0, 50),
        messages: [...messages]
      };
      setSavedChats(prev => [newChat, ...prev]);
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
      content: "Hi! I'm Morphi, your perimenopause companion. I'm here to help you understand your symptoms and navigate this journey. How are you feeling today?",
      timestamp: new Date()
    }]);
    setShowExitDialog(false);
  };

  const handleDeleteChat = (chatId: number) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
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
                            <Card key={chat.id} className="p-3 hover:bg-accent cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground mb-1">
                                    {chat.date}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {chat.preview}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteChat(chat.id);
                                  }}
                                >
                                  <Trash2 size={12} />
                                </Button>
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