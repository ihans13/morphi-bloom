import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ResourceTile from "./ResourceTile";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Resource {
  id: string;
  type: 'podcast' | 'article' | 'product' | 'video';
  title: string;
  subtitle: string;
  thumbnail?: string;
  relevanceScore: number;
}

interface ResourcePresentationProps {
  resources: Resource[];
  symptoms: string[];
  onPinResource: (resourceId: string) => void;
  pinnedResources: string[];
}

const ResourcePresentation: React.FC<ResourcePresentationProps> = ({
  resources,
  symptoms,
  onPinResource,
  pinnedResources
}) => {
  const [showMore, setShowMore] = useState(false);
  
  // Sort resources by relevance and take top 3
  const sortedResources = [...resources].sort((a, b) => b.relevanceScore - a.relevanceScore);
  const primaryResource = sortedResources[0];
  const additionalResources = sortedResources.slice(1, 3);

  const handleResourceClick = (resource: Resource) => {
    // Handle resource click - could open in new tab or show details
    console.log('Resource clicked:', resource);
  };

  return (
    <div className="space-y-4">
      {/* Primary resource description */}
      <p className="text-sm text-[#39403B] leading-relaxed">
        Here's the most relevant resource based on your experience with {symptoms.join(', ')}:
      </p>
      
      {/* Primary resource tile */}
      {primaryResource && (
        <ResourceTile
          {...primaryResource}
          isPinned={pinnedResources.includes(primaryResource.id)}
          onPin={onPinResource}
          onClick={() => handleResourceClick(primaryResource)}
        />
      )}
      
      {/* Show More button */}
      {additionalResources.length > 0 && (
        <Button
          variant="outline"
          className="w-full text-[#39403B] border-[#39403B]/30 hover:bg-[#39403B]/5"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? (
            <>
              <ChevronUp size={16} className="mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-2" />
              Show More
            </>
          )}
        </Button>
      )}
      
      {/* Additional resources */}
      {showMore && (
        <div className="space-y-3">
          {additionalResources.map((resource) => (
            <ResourceTile
              key={resource.id}
              {...resource}
              isPinned={pinnedResources.includes(resource.id)}
              onPin={onPinResource}
              onClick={() => handleResourceClick(resource)}
            />
          ))}
        </div>
      )}
      
      {/* Instructions about pinning */}
      <div className="bg-[#39403B]/5 rounded-lg p-3 text-xs text-[#39403B]/70">
        If you find any of these helpful, you can pin them to save for later - that way you won't lose track of what works for you. Only the resources you pin will be saved.
      </div>
      
      {/* Alternative prompt */}
      <p className="text-sm text-[#39403B] leading-relaxed">
        If these don't seem relevant to what you're looking for, share more and Morphi will look for other things that might help.
      </p>
    </div>
  );
};

export default ResourcePresentation;