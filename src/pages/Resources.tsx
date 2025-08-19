import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  User, 
  Settings, 
  LogOut,
  Camera,
  Plus,
  Search,
  Folder,
  BookOpen,
  Headphones,
  Video,
  ShoppingBag
} from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([
    { id: 'uncategorized', name: 'Uncategorized', itemCount: 2 }
  ]);
  const [newFolderName, setNewFolderName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load folders from localStorage on mount
  useEffect(() => {
    const savedFolders = localStorage.getItem('scrapbook-folders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  // Save folders to localStorage whenever folders change
  useEffect(() => {
    localStorage.setItem('scrapbook-folders', JSON.stringify(folders));
  }, [folders]);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        itemCount: 0
      };
      setFolders(prev => {
        const uncategorized = prev.find(f => f.id === 'uncategorized');
        const otherFolders = prev.filter(f => f.id !== 'uncategorized');
        return [uncategorized, ...otherFolders, newFolder].filter(Boolean);
      });
      setNewFolderName('');
      setIsDialogOpen(false);
    }
  };

  const getCategoriesForFolder = (folderId: string, isFullWidth: boolean, itemCount: number) => {
    if (folderId === 'uncategorized') {
      const categories = [
        { icon: BookOpen, label: 'Articles' },
        { icon: Headphones, label: 'Podcasts' },
        { icon: Video, label: 'Videos' },
        { icon: ShoppingBag, label: 'Products' }
      ];
      // Show more categories when full width, fewer when half width
      const maxVisible = isFullWidth ? 2 : 1;
      return { categories, maxVisible };
    }
    
    // For empty custom folders, return empty categories
    if (itemCount === 0) {
      return { categories: [], maxVisible: 0 };
    }
    
    return { categories: [{ icon: Folder, label: 'Articles' }], maxVisible: 1 };
  };

  return (
    <div 
      className="max-w-md mx-auto p-4 space-y-6 h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: `url('/lovable-uploads/9cc76a1c-07f0-433c-b92e-f8ba3a6b0e05.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Profile Section */}
      <div className="text-center space-y-6 py-8">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-[#39403B] rounded-full border border-border flex items-center justify-center">
            <User size={28} className="text-white" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <Button 
            size="sm" 
            className="text-xs bg-[#CDD8D1] text-[#39403B] border-0 hover:bg-[#CDD8D1]/90"
          >
            Edit Profile
          </Button>
          <Button 
            size="sm" 
            className="text-xs bg-[#CDD8D1] text-[#39403B] border-0 hover:bg-[#CDD8D1]/90"
          >
            <Settings size={14} className="mr-1" />
            App Settings
          </Button>
          <Button 
            size="sm" 
            className="text-xs bg-[#CDD8D1] text-[#39403B] border-0 hover:bg-[#CDD8D1]/90"
          >
            <LogOut size={14} className="mr-1" />
            Log Out
          </Button>
        </div>
      </div>

      <hr className="border-border" />

      {/* My Scrapbook Section */}
      <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
        <div>
          <h2 className="text-lg font-semibold text-foreground">My Scrapbook</h2>
          <p className="text-sm text-muted-foreground">12 items saved across 4 collections</p>
        </div>
        
        {/* Search and Add Section */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search your scrapbook" 
              className="pl-9 text-sm"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#39403B] hover:bg-[#39403B]/90 text-white border-0 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                Add
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFolder}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Folders Grid */}
        <div className={`grid gap-3 ${folders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} flex-1 overflow-y-auto pb-20`}>
          {folders.map((folder) => {
            const isFullWidth = folders.length === 1;
            return (
              <Card 
                key={folder.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-card shadow-sm border"
                onClick={() => navigate(`/resources/folder/${folder.id}`)}
              >
                <div className="p-0">
                  {/* Image Placeholder */}
                  <div className={`bg-muted rounded-t-lg overflow-hidden ${isFullWidth ? 'h-32' : 'h-24'}`}>
                    {folder.id === 'uncategorized' ? (
                      <img 
                        src="/lovable-uploads/d25237f8-bc96-4240-be0e-fad6761f7743.png" 
                        alt="Uncategorized folder" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 space-y-2">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {folder.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {folder.itemCount} {folder.itemCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  
                    {/* Pill Buttons */}
                    <div className="flex gap-1 flex-wrap">
                      {(() => {
                        const { categories, maxVisible } = getCategoriesForFolder(folder.id, isFullWidth, folder.itemCount);
                        const visibleCategories = categories.slice(0, maxVisible);
                        const remainingCount = categories.length - maxVisible;
                        
                        return (
                          <>
                            {visibleCategories.map((category, index) => {
                              const IconComponent = category.icon;
                              return (
                                <div key={index} className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground flex items-center gap-1">
                                  <IconComponent size={10} />
                                  {category.label}
                                </div>
                              );
                            })}
                            {remainingCount > 0 && (
                              <div className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                +{remainingCount}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resources;