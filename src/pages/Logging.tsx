import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, Edit3, Calendar, TrendingUp, Clock, MessageSquare } from "lucide-react";

const Logging = () => {
  const [activeTab, setActiveTab] = useState("template");

  // Sample recent entries data
  const recentEntries = [
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
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Mild": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Severe": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
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

      {/* Logging Options */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template" className="flex items-center gap-2 text-xs">
            <FileText size={16} />
            Form
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2 text-xs">
            <Edit3 size={16} />
            Text
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2 text-xs">
            <Mic size={16} />
            Voice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-primary" size={20} />
              <h3 className="font-semibold">Today's Symptoms</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  How are you feeling overall?
                </label>
                <div className="flex gap-2">
                  {["😔", "😐", "🙂", "😊", "😄"].map((emoji, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-lg hover:bg-accent"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Sleep Quality
                </label>
                <Input placeholder="Hours slept, quality..." />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Physical Symptoms
                </label>
                <Textarea placeholder="Hot flashes, aches, energy levels..." />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Emotional State
                </label>
                <Textarea placeholder="Mood, anxiety, stress levels..." />
              </div>
            </div>
            
            <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-200">
              Save Entry
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Edit3 className="text-primary" size={20} />
              <h3 className="font-semibold">Free Form Entry</h3>
            </div>
            
            <Textarea 
              placeholder="Describe how you're feeling today, any symptoms you're experiencing, or anything else you'd like to track..."
              className="min-h-32"
            />
            
            <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-200">
              Save Entry
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card className="p-4 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mic className="text-primary" size={20} />
              <h3 className="font-semibold">Voice Recording</h3>
            </div>
            
            <div className="py-8">
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-200 w-20 h-20"
              >
                <Mic size={24} />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
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
  );
};

export default Logging;