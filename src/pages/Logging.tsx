import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Mic, Edit3, Calendar, TrendingUp, Clock, MessageSquare, Thermometer, Utensils, Timer, Heart, Activity } from "lucide-react";

const Logging = () => {
  const [activeTab, setActiveTab] = useState("note");
  const [noteText, setNoteText] = useState("");
  const [recentEntries, setRecentEntries] = useState([
    {
      id: 1,
      title: "Morning Reflection",
      type: "Template",
      date: "Today, 8:30 AM",
      severity: "Mild",
      preview: "Slept 7 hours, feeling refreshed. Minor headache after coffee.",
      icon: FileText
    },
    {
      id: 2,
      title: "Evening Journal",
      type: "Journal",
      date: "Yesterday, 9:15 PM",
      severity: "Moderate",
      preview: "Energy levels were good today. Had some mood swings...",
      icon: Edit3
    },
    {
      id: 3,
      title: "Quick Voice Note",
      type: "Voice",
      date: "2 days ago",
      severity: "Mild",
      preview: "Voice recording about hot flashes during meeting",
      icon: Mic
    }
  ]);

  // Template options data
  const templateOptions = [
    {
      id: "symptoms",
      title: "Signs & Symptoms",
      description: "Track physical symptoms and their severity",
      icon: Thermometer,
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      id: "lifestyle",
      title: "Eat, Drink, Sleep",
      description: "Log your meals, hydration, and sleep patterns",
      icon: Utensils,
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: "mood",
      title: "Mood & Energy",
      description: "Monitor your emotional wellbeing and energy levels",
      icon: Timer,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: "pain",
      title: "Pain & Discomfort",
      description: "Track pain levels and locations throughout the day",
      icon: Heart,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      id: "medications",
      title: "Medications & Supplements",
      description: "Record medication timing and supplement intake",
      icon: Activity,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    }
  ];

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    const newEntry = {
      id: Date.now(),
      title: "Personal Note",
      type: "Note",
      date: `Today, ${timeString}`,
      severity: "Mild",
      preview: noteText.length > 50 ? noteText.substring(0, 50) + "..." : noteText,
      icon: Edit3
    };
    
    setRecentEntries([newEntry, ...recentEntries]);
    setNoteText("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Mild": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Severe": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="max-w-md mx-auto p-4 space-y-6 pb-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Journey</h1>
          <p className="text-muted-foreground text-sm">
            Embracing the plot twists, because real journeys are rarely linear
          </p>
        </div>

        {/* Insight Card */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-primary" size={18} />
            <h3 className="font-semibold text-sm">Your Insight</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your headaches seem slightly better and you've slept for 6 hours every night in the last week.
          </p>
        </Card>

        {/* Question */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            How would you like to log today?
          </h2>
        </div>

        {/* Logging Options */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="note" className="flex items-center gap-2 text-xs">
              <Edit3 size={16} />
              Write a Note
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center gap-2 text-xs">
              <FileText size={16} />
              Use Template
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2 text-xs">
              <Mic size={16} />
              Record Voice
            </TabsTrigger>
          </TabsList>

        <TabsContent value="note" className="space-y-4">
          <Card className="p-4 space-y-4 min-h-[240px] flex flex-col">
            <div className="flex items-center gap-2">
              <Edit3 className="text-primary" size={20} />
              <h3 className="font-semibold">Free Form Entry</h3>
            </div>
            
            <Textarea 
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Describe how you're feeling today, any symptoms you're experiencing, or anything else you'd like to track..."
              className="min-h-24 flex-1"
            />
            
            <Button 
              onClick={handleSaveNote}
              disabled={!noteText.trim()}
              variant="ghost"
              className="w-full transition-all duration-200 mt-auto disabled:opacity-100"
              style={{
                background: noteText.trim() ? '#39403B' : 'var(--gradient-primary)',
                color: noteText.trim() ? 'white' : '#39403B',
                border: 'none',
                opacity: 1
              }}
            >
              Save Entry
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-4">
          <Card className="p-4 space-y-4 min-h-[240px] flex flex-col">
            <div className="flex items-center gap-2">
              <FileText className="text-primary" size={20} />
              <h3 className="font-semibold">Choose a Template</h3>
            </div>
            
            <p className="text-sm text-muted-foreground flex-1">
              Select a template to guide your logging experience
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost"
                  className="w-full transition-opacity duration-200 border-0 mt-auto hover:opacity-90"
                  style={{ backgroundColor: '#39403B', color: 'white', border: 'none' }}
                >
                  Browse Templates
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[90vw] max-h-[80vh]">
                <DialogHeader className="pb-4">
                  <DialogTitle className="text-center">Choose a Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 overflow-y-auto">
                  {templateOptions.map((template) => {
                    const IconComponent = template.icon;
                    return (
                       <div
                         key={template.id}
                         className="w-full p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                         onClick={() => {
                           if (template.title === "Signs & Symptoms") {
                             window.location.href = '/signs-symptoms';
                           }
                         }}
                       >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg ${template.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={template.iconColor} size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-2 leading-tight">{template.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card className="p-4 space-y-4 min-h-[240px] flex flex-col">
            <div className="flex items-center gap-2">
              <Mic className="text-primary" size={20} />
              <h3 className="font-semibold">Voice Recording</h3>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-200 w-20 h-20"
              >
                <Mic size={24} />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-auto text-center">
              Tap to start recording your symptoms
            </p>
          </Card>
        </TabsContent>
        </Tabs>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
          <div className="space-y-3">
            {recentEntries.map((entry) => {
              const IconComponent = entry.icon;
              return (
                <Card key={entry.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="text-primary" size={18} />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm">{entry.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {entry.type}
                          </Badge>
                          <Badge className={`text-xs ${getSeverityColor(entry.severity)}`}>
                            {entry.severity}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{entry.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.preview}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Logging;