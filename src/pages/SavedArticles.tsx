import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ExternalLink, Pin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedArticles = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "The Science of Sleep Optimization",
      subtitle: "How to improve your sleep quality naturally",
      source: "Huberman Lab Podcast",
      duration: "45 min",
      isPinned: true,
      thumbnail: "📚"
    },
    {
      id: 2,
      title: "Intermittent Fasting: Complete Guide",
      subtitle: "Benefits, protocols, and common mistakes",
      source: "Healthline",
      duration: "8 min read",
      isPinned: false,
      thumbnail: "🍽️"
    },
    {
      id: 3,
      title: "Mindfulness Meditation for Beginners",
      subtitle: "Start your meditation practice today",
      source: "Headspace Blog",
      duration: "6 min read",
      isPinned: true,
      thumbnail: "🧘"
    },
    {
      id: 4,
      title: "Cold Exposure Benefits",
      subtitle: "The Wim Hof Method explained",
      source: "The Joe Rogan Experience",
      duration: "2h 15min",
      isPinned: false,
      thumbnail: "🧊"
    }
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/resources')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Saved Articles & Podcasts</h1>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-warm transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="text-2xl">{article.thumbnail}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-foreground leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {article.subtitle}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Pin size={14} className={article.isPinned ? "fill-current text-primary" : "text-muted-foreground"} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {article.source}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {article.duration}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedArticles;