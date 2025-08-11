import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Pill, MessageCircle, CheckCircle } from "lucide-react";
import { useResources } from "@/contexts/ResourceContext";
import { ResourceTile } from "@/components/ResourceTile";

const Resources = () => {
  const { pinnedResources, unpinResource } = useResources();
  
  const categorizeResources = () => {
    const categories = {
      articles: pinnedResources.filter(r => r.category === "articles"),
      supplements: pinnedResources.filter(r => r.category === "supplements"), 
      qna: pinnedResources.filter(r => r.category === "qna"),
      tried: pinnedResources.filter(r => r.category === "tried")
    };
    return categories;
  };
  
  const categorizedResources = categorizeResources();
  
  const categoryConfigs = [
    {
      id: "articles",
      title: "Articles & Podcasts",
      icon: BookOpen,
      count: categorizedResources.articles.length,
      color: "bg-gradient-primary",
      resources: categorizedResources.articles
    },
    {
      id: "supplements",
      title: "Supplements & Products",
      icon: Pill,
      count: categorizedResources.supplements.length,
      color: "bg-accent",
      resources: categorizedResources.supplements
    },
    {
      id: "qna",
      title: "Helpful Q&A Posts",
      icon: MessageCircle,
      count: categorizedResources.qna.length,
      color: "bg-secondary",
      resources: categorizedResources.qna
    },
    {
      id: "tried",
      title: "Tried and Tested",
      icon: CheckCircle,
      count: categorizedResources.tried.length,
      color: "bg-muted",
      resources: categorizedResources.tried
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
        {categoryConfigs.map((category) => {
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

      {/* Pinned Resources */}
      {pinnedResources.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recently Saved</h2>
          
          <div className="space-y-3">
            {pinnedResources.slice(0, 5).map((resource) => (
              <ResourceTile 
                key={resource.id}
                resource={resource}
                onPin={() => unpinResource(resource.id)}
                showPinButton={false}
              />
            ))}
          </div>
        </div>
      )}
      
      {pinnedResources.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            No saved resources yet. Start a conversation with Morphi to discover helpful resources!
          </p>
        </div>
      )}
    </div>
  );
};

export default Resources;