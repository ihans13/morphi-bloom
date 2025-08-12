import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pill, ExternalLink, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Supplements = () => {
  const navigate = useNavigate();

  const supplements = [
    {
      id: 1,
      name: "Magnesium Glycinate",
      brand: "Thorne Health",
      dosage: "400mg before bed",
      rating: 4.8,
      price: "$32",
      category: "Sleep Support",
      thumbnail: "💊"
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil",
      brand: "Nordic Naturals",
      dosage: "2 capsules daily",
      rating: 4.6,
      price: "$45",
      category: "Heart Health",
      thumbnail: "🐟"
    },
    {
      id: 3,
      name: "Vitamin D3 + K2",
      brand: "Life Extension",
      dosage: "5000 IU daily",
      rating: 4.7,
      price: "$28",
      category: "Immune Support",
      thumbnail: "☀️"
    },
    {
      id: 4,
      name: "Ashwagandha Root",
      brand: "KSM-66",
      dosage: "600mg morning",
      rating: 4.5,
      price: "$38",
      category: "Stress Relief",
      thumbnail: "🌿"
    },
    {
      id: 5,
      name: "Creatine Monohydrate",
      brand: "Optimum Nutrition",
      dosage: "5g post-workout",
      rating: 4.9,
      price: "$25",
      category: "Performance",
      thumbnail: "💪"
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
          <Pill size={20} className="text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Supplements & Products</h1>
        </div>
      </div>

      {/* Supplements List */}
      <div className="space-y-3">
        {supplements.map((supplement) => (
          <Card key={supplement.id} className="hover:shadow-warm transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="text-2xl">{supplement.thumbnail}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-foreground leading-tight">
                        {supplement.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {supplement.brand} • {supplement.dosage}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {supplement.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-current text-yellow-500" />
                        <span className="text-xs text-muted-foreground">{supplement.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {supplement.price}
                    </div>
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

export default Supplements;