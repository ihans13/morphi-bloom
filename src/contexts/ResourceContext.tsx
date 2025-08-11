import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Resource } from '@/lib/conversationTypes';

interface ResourceContextType {
  pinnedResources: Resource[];
  pinResource: (resource: Resource) => void;
  unpinResource: (resourceId: string) => void;
  isPinned: (resourceId: string) => boolean;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedResources, setPinnedResources] = useState<Resource[]>([]);

  const pinResource = (resource: Resource) => {
    setPinnedResources(prev => {
      if (prev.find(r => r.id === resource.id)) return prev;
      return [...prev, { ...resource, isPinned: true }];
    });
  };

  const unpinResource = (resourceId: string) => {
    setPinnedResources(prev => prev.filter(r => r.id !== resourceId));
  };

  const isPinned = (resourceId: string) => {
    return pinnedResources.some(r => r.id === resourceId);
  };

  return (
    <ResourceContext.Provider value={{
      pinnedResources,
      pinResource,
      unpinResource,
      isPinned
    }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within ResourceProvider');
  }
  return context;
};