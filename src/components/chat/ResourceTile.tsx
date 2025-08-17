import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, PinOff } from "lucide-react";

interface ResourceTileProps {
  id: string;
  type: 'podcast' | 'article' | 'product' | 'video';
  title: string;
  subtitle: string;
  thumbnail?: string;
  isPinned?: boolean;
  onPin?: (id: string) => void;
  onClick?: () => void;
}

const ResourceTile: React.FC<ResourceTileProps> = ({
  id,
  type,
  title,
  subtitle,
  thumbnail,
  isPinned = false,
  onPin,
  onClick
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'podcast': return '🎧';
      case 'article': return '📖';
      case 'product': return '💊';
      case 'video': return '🎥';
      default: return '📄';
    }
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPin?.(id);
  };

  return (
    <Card 
      className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          {/* Thumbnail */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7B6B97] to-[#9B8BB7] flex items-center justify-center flex-shrink-0">
            {thumbnail ? (
              <img src={thumbnail} alt="" className="w-full h-full rounded-lg object-cover" />
            ) : (
              <span className="text-white text-lg">{getTypeIcon()}</span>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[#39403B] text-sm leading-tight mb-1 line-clamp-2">
              {getTypeIcon()} {title}
            </h4>
            <p className="text-xs text-[#39403B]/70 line-clamp-2">
              {subtitle}
            </p>
          </div>
          
          {/* Pin button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePinClick}
            className="p-1 h-auto text-[#39403B]/60 hover:text-[#39403B] hover:bg-[#39403B]/10"
          >
            {isPinned ? <Pin size={14} className="fill-current" /> : <PinOff size={14} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceTile;