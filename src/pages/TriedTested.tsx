import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TriedTested = () => {
  const navigate = useNavigate();

  const triedItems = [
    {
      id: 1,
      name: "16:8 Intermittent Fasting",
      category: "Nutrition Protocol",
      rating: 5,
      duration: "3 months",
      notes: "Significant energy improvement and weight loss. Easy to maintain long-term.",
      status: "Currently using",
      dateStarted: "Jan 2024"
    },
    {
      id: 2,
      name: "Cold Plunge Therapy",
      category: "Recovery",
      rating: 4,
      duration: "6 weeks",
      notes: "Great for recovery but requires discipline. Best results with consistent schedule.",
      status: "Completed",
      dateStarted: "Feb 2024"
    },
    {
      id: 3,
      name: "Meditation (10min daily)",
      category: "Mental Health",
      rating: 5,
      duration: "2 months",
      notes: "Reduced anxiety and improved focus. Life-changing habit for stress management.",
      status: "Currently using",
      dateStarted: "Dec 2023"
    },
    {
      id: 4,
      name: "Sleep Optimization Protocol",
      category: "Sleep",
      rating: 4,
      duration: "4 months",
      notes: "Blue light blocking and cool room temperature helped significantly.",
      status: "Currently using",
      dateStarted: "Oct 2023"
    },
    {
      id: 5,
      name: "High-Intensity Interval Training",
      category: "Exercise",
      rating: 3,
      duration: "8 weeks",
      notes: "Effective but very demanding. Switched to moderate intensity for sustainability.",
      status: "Modified",
      dateStarted: "Nov 2023"
    },
    {
      id: 6,
      name: "Ketogenic Diet",
      category: "Nutrition",
      rating: 2,
      duration: "1 month",
      notes: "Too restrictive for my lifestyle. Energy was inconsistent throughout.",
      status: "Discontinued",
      dateStarted: "Sep 2023"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Currently using": return "bg-green-500/10 text-green-700 border-green-500/20";
      case "Completed": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "Modified": return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "Discontinued": return "bg-red-500/10 text-red-700 border-red-500/20";
      default: return "bg-secondary";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={i < rating ? "fill-current text-yellow-500" : "text-muted-foreground/40"}
      />
    ));
  };

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
          <CheckCircle size={20} className="text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Tried & Tested</h1>
        </div>
      </div>

      {/* Tried Items List */}
      <div className="space-y-4">
        {triedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-warm transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground leading-tight">
                    {item.name}
                  </h3>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {item.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(item.rating)}
                  </div>
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.notes}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{item.dateStarted} • {item.duration}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-auto">
                  Edit Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TriedTested;