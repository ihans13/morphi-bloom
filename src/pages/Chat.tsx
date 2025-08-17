import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, MoreHorizontal, X, History, Info } from "lucide-react";
import ResourcePresentation from "@/components/chat/ResourcePresentation";
import FolderSelectionDialog from "@/components/chat/FolderSelectionDialog";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  hasResources: boolean;
  resources?: Array<{
    id: string;
    type: 'podcast' | 'article' | 'product' | 'video';
    title: string;
    subtitle: string;
    relevanceScore: number;
    url?: string;
    thumbnail?: string;
  }>;
  symptoms?: string[];
}

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  
  // Conversation state management
  const [conversationStage, setConversationStage] = useState<'initiation' | 'validation' | 'listening' | 'symptom_gathering' | 'resource_intro' | 'resource_presentation' | 'post_resource'>('initiation');
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [pinnedResources, setPinnedResources] = useState<string[]>([]);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [selectedResourceForFolder, setSelectedResourceForFolder] = useState<{id: string, title: string} | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "morphi",
      content: "Hi! I'm Morphi, your perimenopause companion. I'm here to listen, help you understand your symptoms and navigate this journey. How are you feeling today?",
      timestamp: new Date(),
      hasResources: false
    }
  ]);

  // Mock resources data
  const mockResources = [
    {
      id: '1',
      type: 'podcast' as const,
      title: 'The Psychological Effects of Perimenopause & Menopause with Dr. Bev Young',
      subtitle: 'Podcast by Morphus | Menopause Reimagined (12:34 - 18:20)',
      relevanceScore: 95,
      url: 'https://youtu.be/dF-zsHshB0U',
      thumbnail: '/lovable-uploads/d25237f8-bc96-4240-be0e-fad6761f7743.png'
    },
    {
      id: '2',
      type: 'article' as const,
      title: 'Managing Hot Flashes Naturally',
      subtitle: 'Article by Women\'s Health Collective (6 mins read)',
      relevanceScore: 88
    },
    {
      id: '3',
      type: 'product' as const,
      title: 'Magnesium Complex for Hormonal Balance',
      subtitle: 'Product recommended by Dr. Sarah Johnson, MD',
      relevanceScore: 76
    }
  ];

  const getResponseBasedOnStage = (userMessage: string, stage: string): { content: string; newStage: string; hasResources: boolean } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for transition triggers
    const isReadyForResources = lowerMessage.includes('what should i do') || 
                               lowerMessage.includes('what can help') || 
                               lowerMessage.includes('need to figure this out') ||
                               exchangeCount >= 4;

    switch (stage) {
      case 'initiation':
        return {
          content: "That sounds challenging and it's completely understandable to feel uncertain when your body is changing. Thank you for sharing this with me. I'd love to learn more about what you're experiencing.",
          newStage: 'validation',
          hasResources: false
        };
        
      case 'validation':
      case 'listening':
        if (isReadyForResources) {
          return {
            content: `Based on what you've shared about your symptoms, I've found some resources that have helped other women with similar experiences. Would you like me to share some suggestions you could explore?`,
            newStage: 'resource_intro',
            hasResources: false
          };
        }
        
        // Extract potential symptoms from user message
        const symptoms = extractSymptoms(userMessage);
        setUserSymptoms(prev => [...new Set([...prev, ...symptoms])]);
        
        return {
          content: `Feeling confused about what's happening is so normal - many women experience this uncertainty. According to our research, ${symptoms.length > 0 ? `symptoms like ${symptoms.join(', ')} are` : 'these experiences are'} very common during perimenopause. It sounds like you're dealing with some significant changes. Have you noticed if these symptoms happen at certain times of day or month?`,
          newStage: 'symptom_gathering',
          hasResources: false
        };
        
      case 'symptom_gathering':
        if (isReadyForResources) {
          return {
            content: `Based on what you've shared about ${userSymptoms.slice(0, 2).join(' and ')}, I've found some resources that have helped other women with similar experiences. Would you like me to share some suggestions you could explore?`,
            newStage: 'resource_intro',
            hasResources: false
          };
        }
        
        return {
          content: `Thank you for sharing more details. How are these symptoms affecting your daily life? Have you been able to discuss these with a healthcare practitioner yet?`,
          newStage: 'symptom_gathering',
          hasResources: false
        };
        
      case 'resource_intro':
        if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('okay')) {
          return {
            content: '',
            newStage: 'resource_presentation',
            hasResources: true
          };
        }
        return {
          content: "I understand. What would be most helpful for you right now?",
          newStage: 'listening',
          hasResources: false
        };
        
      case 'resource_presentation':
        return {
          content: "Is there anything else that might be helpful? Would you like me to remind you to track how these suggestions work for you?",
          newStage: 'post_resource',
          hasResources: false
        };
        
      default:
        return {
          content: "Thank you for sharing. I'm here to support you through your perimenopause journey. Tell me more about what you're experiencing.",
          newStage: 'listening',
          hasResources: false
        };
    }
  };

  const extractSymptoms = (message: string): string[] => {
    const symptomKeywords = {
      'hot flashes': ['hot flash', 'hot flush', 'heat wave', 'sweating'],
      'sleep issues': ['sleep', 'insomnia', 'tired', 'exhausted'],
      'mood changes': ['mood', 'anxiety', 'depression', 'irritable'],
      'irregular periods': ['period', 'cycle', 'menstrual', 'bleeding'],
      'brain fog': ['memory', 'focus', 'concentration', 'forgetful']
    };
    
    const foundSymptoms: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    Object.entries(symptomKeywords).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        foundSymptoms.push(symptom);
      }
    });
    
    return foundSymptoms;
  };

  const handlePinResource = (resourceId: string) => {
    const isCurrentlyPinned = pinnedResources.includes(resourceId);
    
    if (isCurrentlyPinned) {
      // Unpinning - just remove from pinned resources
      setPinnedResources(prev => prev.filter(id => id !== resourceId));
      toast({
        title: "Resource unpinned",
        description: "Resource removed from your saved items"
      });
    } else {
      // Pinning - add to pinned resources and show folder selection
      setPinnedResources(prev => [...prev, resourceId]);
      
      // Find the resource details from current messages
      const resource = messages
        .flatMap(msg => msg.resources || [])
        .find(r => r.id === resourceId);
      
      if (resource) {
        setSelectedResourceForFolder({
          id: resourceId,
          title: resource.title
        });
        setFolderDialogOpen(true);
      }
      
      toast({
        title: "Resource pinned!",
        description: "Choose a folder to save this resource"
      });
    }
  };

  const handleSaveToFolder = (folderId: string) => {
    if (!selectedResourceForFolder) return;

    // Get current folders
    const savedFolders = localStorage.getItem('scrapbook-folders');
    const folders = savedFolders ? JSON.parse(savedFolders) : [
      { id: 'all-clippings', name: 'All clippings', itemCount: 0 }
    ];

    // Get current folder resources
    const folderResourcesKey = `folder-resources-${folderId}`;
    const currentResources = JSON.parse(localStorage.getItem(folderResourcesKey) || '[]');

    // Find the full resource data
    const resource = messages
      .flatMap(msg => msg.resources || [])
      .find(r => r.id === selectedResourceForFolder.id);

    if (resource && !currentResources.find((r: any) => r.id === resource.id)) {
      // Add resource to folder
      const updatedResources = [...currentResources, resource];
      localStorage.setItem(folderResourcesKey, JSON.stringify(updatedResources));

      // Update folder item count
      const updatedFolders = folders.map((folder: any) => 
        folder.id === folderId 
          ? { ...folder, itemCount: updatedResources.length }
          : folder
      );
      localStorage.setItem('scrapbook-folders', JSON.stringify(updatedFolders));

      const folderName = folders.find((f: any) => f.id === folderId)?.name || 'folder';
      toast({
        title: "Resource saved!",
        description: `"${selectedResourceForFolder.title}" saved to ${folderName}`
      });
    }

    setSelectedResourceForFolder(null);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage("");
    setExchangeCount(prev => prev + 1);
    
    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, {
      id: userMsgId,
      sender: "user",
      content: userMessage,
      timestamp: new Date(),
      hasResources: false
    }]);
    
    // Get bot response based on conversation stage
    const response = getResponseBasedOnStage(userMessage, conversationStage);
    setConversationStage(response.newStage as any);
    
    // Simulate bot response
    setTimeout(() => {
      const botMsgId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: botMsgId,
        sender: "morphi",
        content: response.content,
        timestamp: new Date(),
        hasResources: response.hasResources,
        resources: response.hasResources ? mockResources : undefined,
        symptoms: response.hasResources ? userSymptoms : undefined
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
              
              {/* Resource Presentation */}
              {msg.hasResources && msg.resources && msg.symptoms && (
                <div className="mt-4">
                  <ResourcePresentation
                    resources={msg.resources}
                    symptoms={msg.symptoms}
                    onPinResource={handlePinResource}
                    pinnedResources={pinnedResources}
                  />
                </div>
              )}
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

      {/* Folder Selection Dialog */}
      <FolderSelectionDialog
        isOpen={folderDialogOpen}
        onClose={() => {
          setFolderDialogOpen(false);
          setSelectedResourceForFolder(null);
        }}
        onSaveToFolder={handleSaveToFolder}
        resourceTitle={selectedResourceForFolder?.title || ''}
      />
    </div>
  );
};

export default Chat;