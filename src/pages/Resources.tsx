import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Pill, MessageCircle, CheckCircle } from "lucide-react";

const Resources = () => {
  const categories = [
    {
      id: "articles",
      title: "Articles & Podcasts",
      icon: BookOpen,
      count: 12,
      color: "bg-gradient-primary",
      items: [
        "Understanding Perimenopause Stages",
        "Nutrition During Hormonal Changes",
        "The Menopause Doctor Podcast"
      ]
    },
    {
      id: "supplements",
      title: "Supplements & Products",
      icon: Pill,
      count: 8,
      color: "bg-accent",
      items: [
        "Evening Primrose Oil",
        "Magnesium for Sleep",
        "Cooling Pillow"
      ]
    },
    {
      id: "qna",
      title: "Helpful Q&A Posts",
      icon: MessageCircle,
      count: 5,
      color: "bg-secondary",
      items: [
        "Managing Hot Flashes at Work",
        "Sleep Strategies That Work",
        "Explaining Symptoms to Family"
      ]
    },
    {
      id: "tried",
      title: "Tried and Tested",
      icon: CheckCircle,
      count: 6,
      color: "bg-muted",
      items: [
        "Yoga for Hormone Balance",
        "Mediterranean Diet Plan",
        "Mindfulness App"
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Saved Resources</h1>
        <p className="text-muted-foreground text-sm">
          Your personalized collection of helpful content
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="p-4 hover:shadow-warm transition-shadow cursor-pointer">
              <div className="text-center space-y-3">
                <div className={`mx-auto w-12 h-12 rounded-full ${category.color} flex items-center justify-center shadow-lg`}>
                  <Icon 
                    size={24} 
                    className={category.id === "articles" ? "text-primary-foreground" : "text-foreground"}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground leading-tight">
                    {category.title}
                  </h3>
                  <Badge variant="secondary" className="mt-2">
                    {category.count}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recently Saved</h2>
        
        {categories.map((category) => (
          <Card key={`recent-${category.id}`} className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                <category.icon 
                  size={16} 
                  className={category.id === "articles" ? "text-primary-foreground" : "text-foreground"}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-foreground">
                  {category.items[0]}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  From {category.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;