import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Plus, Thermometer, Brain, Moon, Heart } from "lucide-react";

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

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Track Symptoms</h1>
        <p className="text-sm text-muted-foreground">
          Monitor your journey and identify patterns
        </p>
      </div>

      {/* Quick Log Button */}
      <Button 
        variant="default"
        className="w-full"
      >
        <Plus size={18} className="mr-2" />
        Log New Symptom
      </Button>

      {/* Today's Summary */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Today's Log</h2>
        </div>
        
        {todaysSymptoms.length > 0 ? (
          <div className="space-y-3">
            {todaysSymptoms.map((symptom) => {
              const Icon = symptom.icon;
              return (
                <Card key={symptom.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Icon size={16} className="text-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm text-foreground">{symptom.name}</h3>
                        <span className="text-xs text-muted-foreground">{symptom.time}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getSeverityColor(symptom.severity)}`}
                      >
                        {symptom.severity}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm">No symptoms logged today</p>
            <Button variant="outline" size="sm" className="mt-3">
              Add First Entry
            </Button>
          </Card>
        )}
      </div>

      {/* Weekly Trends */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className="text-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Weekly Trends</h2>
        </div>
        
        <div className="space-y-3">
          {weeklyTrends.map((trend, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm text-foreground">{trend.symptom}</h3>
                  <p className={`text-xs capitalize ${getTrendColor(trend.trend)}`}>
                    {trend.trend}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getTrendColor(trend.trend)}`}>
                    {trend.change}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">This Week</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-xs text-muted-foreground">Entries Logged</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">Patterns Found</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Track;