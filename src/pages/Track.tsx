import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Edit3, Mic, Thermometer, Brain, Moon } from "lucide-react";

const Track = () => {
  const todaysSymptoms = [
    { id: 1, name: "Hot Flashes", severity: "Moderate", time: "10:30 AM", icon: Thermometer },
    { id: 2, name: "Brain Fog", severity: "Mild", time: "2:15 PM", icon: Brain },
    { id: 3, name: "Sleep Quality", severity: "Poor", time: "Last night", icon: Moon },
  ];

  const weeklyTrends = [
    { symptom: "Hot Flashes", trend: "increasing", change: "+15%" },
    { symptom: "Sleep Quality", trend: "improving", change: "-10%" },
    { symptom: "Mood", trend: "stable", change: "0%" },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-green-600";
      case "increasing": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild": return "bg-green-100 text-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "severe": return "bg-red-100 text-red-800";
      case "poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const recentEntries = [
    { 
      id: 1, 
      title: "Morning Headache", 
      type: "Template", 
      date: "Jan 19, 8:30 AM",
      severity: "7/10",
      icon: FileText 
    },
    { 
      id: 2, 
      title: "Feeling Better Today", 
      type: "Journal", 
      date: "Jan 18, 7:45 PM",
      preview: "Had a good night's sleep and feeling more energetic this morning. The new meditation...",
      icon: Edit3 
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Your Journey</h1>
        <p className="text-sm text-muted-foreground">
          Embracing the plot twists, because real journeys are rarely linear
        </p>
      </div>

      {/* Insight */}
      <Card className="p-4 bg-muted/20">
        <p className="text-sm text-foreground">
          Your headaches seem slightly better and you've slept for 6 hours every night in the last week.
        </p>
      </Card>

      {/* How would you like to log today? */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">How would you like to log today?</h2>
        
        {/* Logging Options */}
        <div className="space-y-3">
          {/* Use Template */}
          <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Use Template</h3>
                <p className="text-sm text-muted-foreground">Structured questions to guide your entry</p>
              </div>
            </div>
          </Card>

          {/* Write Journal Entry */}
          <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Edit3 size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Write Journal Entry</h3>
                <p className="text-sm text-muted-foreground">Free-form writing about how you're feeling</p>
              </div>
            </div>
          </Card>

          {/* Voice Recording */}
          <Card className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <Mic size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Voice Recording</h3>
                <p className="text-sm text-muted-foreground">Record your thoughts and symptoms by speaking</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentEntries.map((entry) => {
            const Icon = entry.icon;
            return (
              <Card key={entry.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon size={16} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-foreground">{entry.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {entry.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{entry.date}</p>
                    {entry.severity && (
                      <div className="inline-block">
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                          Severity: {entry.severity}
                        </Badge>
                      </div>
                    )}
                    {entry.preview && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {entry.preview}
                      </p>
                    )}
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

export default Track;