import { Resource } from "@/lib/conversationTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, PinOff } from "lucide-react";

interface ResourceTileProps {
  resource: Resource;
  onPin: (resource: Resource) => void;
  showPinButton?: boolean;
}

export const ResourceTile = ({ resource, onPin, showPinButton = true }: ResourceTileProps) => {
  return (
    <Card className="p-3 hover:shadow-warm transition-shadow">
      <div className="flex gap-3">
        <div className="w-15 h-15 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23f3f4f6'/%3E%3Ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-size='12'%3E📄%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
            {resource.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {resource.subtitle}
          </p>
          {showPinButton && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-6 px-2 text-xs"
              onClick={() => onPin(resource)}
            >
              {resource.isPinned ? (
                <>
                  <PinOff size={12} className="mr-1" />
                  Pinned
                </>
              ) : (
                <>
                  <Pin size={12} className="mr-1" />
                  Pin to save
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};