import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, TrendingUp, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Chat with Morphi",
      description: "Get AI-powered insights about your symptoms",
      icon: Sparkles,
      action: () => navigate("/chat"),
      gradient: "bg-gradient-primary"
    },
    {
      title: "Log Symptoms",
      description: "Track how you're feeling today",
      icon: Calendar,
      action: () => navigate("/logging"),
      gradient: "bg-gradient-secondary"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="text-center bg-gradient-hero rounded-2xl p-6 text-primary-foreground shadow-glow">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-primary-foreground" size={28} />
          <h1 className="text-2xl font-bold">Welcome</h1>
        </div>
        <p className="text-primary-foreground/90 text-sm leading-relaxed">
          Your personal companion for understanding and navigating perimenopause with confidence
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index} 
              className="p-4 cursor-pointer hover:shadow-warm transition-all duration-200 active:scale-[0.98]"
              onClick={action.action}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${action.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today's Insight */}
      <Card className="p-4 bg-accent/50 border-accent">
        <div className="flex items-start gap-3">
          <TrendingUp className="text-primary mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Today's Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tracking your symptoms consistently helps identify patterns and triggers. Even small notes can provide valuable insights over time.
            </p>
          </div>
        </div>
      </Card>

      {/* Community Highlight */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <Users className="text-primary mt-1" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">Community Highlight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              "Finding this community has been life-changing. Finally, people who understand what I'm going through."
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/community")}
              className="hover:bg-accent"
            >
              Join the Conversation
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
