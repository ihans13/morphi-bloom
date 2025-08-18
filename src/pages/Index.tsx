import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Users, BookOpen, MessageCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sleepThumb from "@/assets/sleep-insight-thumb.jpg";
import nutritionThumb from "@/assets/nutrition-insight-thumb.jpg";
import exerciseThumb from "@/assets/exercise-insight-thumb.jpg";

const Index = () => {
  const navigate = useNavigate();

  const weeklyInsights = [
    {
      id: 1,
      title: "Managing Sleep During Perimenopause",
      description: "Expert tips for better rest and recovery",
      readTime: "5 min read",
      category: "Sleep & Rest",
      thumbnail: sleepThumb
    },
    {
      id: 2,
      title: "Nutrition for Hormonal Balance",
      description: "Foods that support your body through changes",
      readTime: "20 min listen",
      category: "Nutrition",
      thumbnail: nutritionThumb
    },
    {
      id: 3,
      title: "Exercise and Joint Health",
      description: "Gentle movements to keep you strong",
      readTime: "4 min read",
      category: "Fitness",
      thumbnail: exerciseThumb
    }
  ];

  const communityHighlights = [
    {
      id: 1,
      title: "How do you manage hot flashes at work?",
      author: "Sarah M.",
      replies: 12,
      preview: "Looking for discrete ways to stay cool during meetings...",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best supplements for mood swings?",
      author: "Jennifer K.",
      replies: 8,
      preview: "Has anyone tried magnesium for emotional balance?",
      timeAgo: "5 hours ago"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 bg-background min-h-screen pb-32">
      {/* Hero Section */}
      <div className="text-center bg-gradient-hero rounded-2xl p-6 text-foreground shadow-glow">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-foreground" size={28} />
          <h1 className="text-2xl font-bold">Welcome</h1>
        </div>
        <p className="text-foreground/80 text-sm leading-relaxed">
          Your personal companion for understanding and navigating perimenopause with confidence
        </p>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl border border-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="text-foreground" size={24} />
          </div>
          <p className="text-sm text-muted-foreground">Image placeholder</p>
        </div>
      </div>

      {/* Insights of the Week */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Insights of the Week</h2>
        {weeklyInsights.map((insight) => (
          <Card 
            key={insight.id} 
            className="p-4 cursor-pointer hover:shadow-warm transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={insight.thumbnail} 
                  alt={insight.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                    {insight.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {insight.readTime}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{insight.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Highlights */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Community Highlights</h2>
        <p className="text-xs text-muted-foreground">Based on your conversations with Morphi</p>
        {communityHighlights.map((highlight) => (
          <Card 
            key={highlight.id} 
            className="p-4 cursor-pointer hover:shadow-warm transition-all duration-200 active:scale-[0.98]"
            onClick={() => navigate("/community")}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                <MessageCircle size={16} className="text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{highlight.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{highlight.preview}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>by {highlight.author}</span>
                  <span>{highlight.replies} replies</span>
                  <span>{highlight.timeAgo}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <Button 
          variant="default" 
          size="sm"
          onClick={() => navigate("/community")}
          className="w-full"
        >
          <Users size={16} className="mr-2" />
          Explore More Discussions
        </Button>
      </div>
    </div>
  );
};

export default Index;
