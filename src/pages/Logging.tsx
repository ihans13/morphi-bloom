import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Mic, Edit3, Calendar } from "lucide-react";

const Logging = () => {
  const [activeTab, setActiveTab] = useState("template");

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Track Symptoms</h1>
        <p className="text-muted-foreground text-sm">
          Choose your preferred logging format
        </p>
      </div>

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
    </div>
  );
};

export default Logging;