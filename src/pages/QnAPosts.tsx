import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, ThumbsUp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QnAPosts = () => {
  const navigate = useNavigate();

  const qnaPosts = [
    {
      id: 1,
      question: "Best time to take creatine for optimal results?",
      answer: "Post-workout with carbs for better absorption. Timing matters less than consistency.",
      author: "Dr. Sarah Chen",
      likes: 24,
      replies: 8,
      category: "Supplements",
      timeAgo: "2 days ago"
    },
    {
      id: 2,
      question: "How to break a 16:8 intermittent fasting safely?",
      answer: "Start with easily digestible foods like fruits, then progress to full meals gradually.",
      author: "Nutritionist Mike",
      likes: 31,
      replies: 12,
      category: "Nutrition",
      timeAgo: "5 days ago"
    },
    {
      id: 3,
      question: "Sleep quality vs sleep quantity - what matters more?",
      answer: "Quality trumps quantity. 6 hours of deep sleep > 8 hours of fragmented sleep.",
      author: "Sleep Specialist",
      likes: 45,
      replies: 6,
      category: "Sleep",
      timeAgo: "1 week ago"
    },
    {
      id: 4,
      question: "Cold showers - morning or evening routine?",
      answer: "Morning for energy boost, avoid evening as it can interfere with sleep preparation.",
      author: "Wellness Coach",
      likes: 18,
      replies: 15,
      category: "Recovery",
      timeAgo: "3 days ago"
    },
    {
      id: 5,
      question: "Meditation duration for beginners?",
      answer: "Start with 5-10 minutes daily. Consistency beats duration in building the habit.",
      author: "Mindfulness Expert",
      likes: 27,
      replies: 9,
      category: "Mental Health",
      timeAgo: "1 day ago"
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
          <MessageCircle size={20} className="text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Q&A Posts</h1>
        </div>
      </div>

      {/* Q&A Posts List */}
      <div className="space-y-4">
        {qnaPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-warm transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground leading-tight">
                    {post.question}
                  </h3>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {post.category}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {post.answer}
                </p>
                
                <div className="text-xs text-muted-foreground">
                  by <span className="font-medium">{post.author}</span> • {post.timeAgo}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post.replies}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-auto">
                  View Thread
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QnAPosts;