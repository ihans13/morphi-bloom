import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, ExternalLink } from "lucide-react";
import { useState } from "react";

export interface Resource {
  id: string;
  type: 'article' | 'podcast' | 'video' | 'product';
  title: string;
  subtitle: string;
  thumbnail: string;
  link: string;
  relevanceScore: number;
}

interface ResourceTileProps {
  resource: Resource;
  onPin?: (resourceId: string) => void;
  isPinned?: boolean;
}

export const ResourceTile = ({ resource, onPin, isPinned }: ResourceTileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="p-3 hover:bg-accent/50 transition-all duration-200 cursor-pointer border-accent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground text-lg">
          {resource.thumbnail}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm leading-tight mb-1 text-foreground">
            {resource.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {resource.subtitle}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {onPin && (
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 transition-all duration-200 ${
                isPinned 
                  ? 'text-primary hover:text-primary/80' 
                  : isHovered 
                    ? 'text-muted-foreground hover:text-foreground opacity-100' 
                    : 'opacity-0'
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPin(resource.id);
              }}
            >
              <Pin size={14} className={isPinned ? 'fill-current' : ''} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 transition-all duration-200 ${
              isHovered 
                ? 'text-muted-foreground hover:text-foreground opacity-100' 
                : 'opacity-0'
            }`}
            onClick={() => window.open(resource.link, '_blank')}
          >
            <ExternalLink size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface ResourceListProps {
  resources: Resource[];
  onPin?: (resourceId: string) => void;
  pinnedResources?: string[];
  showMore?: boolean;
  onShowMoreToggle?: () => void;
}

export const ResourceList = ({ 
  resources, 
  onPin, 
  pinnedResources = [], 
  showMore = false,
  onShowMoreToggle 
}: ResourceListProps) => {
  const displayedResources = showMore ? resources : resources.slice(0, 1);
  const hasMoreResources = resources.length > 1;

  return (
    <div className="space-y-3">
      {/* Most relevant resource description */}
      {resources.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Here's the most relevant resource based on what you've shared:
        </p>
      )}
      
      {/* Resource tiles */}
      <div className="space-y-2">
        {displayedResources.map((resource) => (
          <ResourceTile
            key={resource.id}
            resource={resource}
            onPin={onPin}
            isPinned={pinnedResources.includes(resource.id)}
          />
        ))}
      </div>
      
      {/* Show More button */}
      {hasMoreResources && (
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={onShowMoreToggle}
            className="w-full"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
          
          {!showMore && (
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                If you find any of these helpful, you can pin them to save for later - 
                that way you won't lose track of what works for you. Only the resources 
                you pin will be saved.
              </p>
              <p>
                If these don't seem relevant to what you're looking for, share more and 
                Morphi will look for other things that might help.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};