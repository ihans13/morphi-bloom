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
  Folder
} from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([
    { id: 'all-clippings', name: 'All clippings', itemCount: 12 }
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
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <div 
      className="max-w-md mx-auto p-4 space-y-6 h-full relative"
      style={{
        backgroundImage: `url('/lovable-uploads/9cc76a1c-07f0-433c-b92e-f8ba3a6b0e05.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Profile Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-16 h-16 bg-card rounded-full border border-border flex items-center justify-center">
            <User size={24} className="text-muted-foreground" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm" className="text-xs">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Settings size={14} className="mr-1" />
            App Settings
          </Button>
          <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive hover:bg-destructive/10">
            <LogOut size={14} className="mr-1" />
            Log Out
          </Button>
        </div>
      </div>

      <hr className="border-border" />

      {/* My Scrapbook Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">My Scrapbook</h2>
        
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
        <div className={`grid gap-3 ${folders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} overflow-y-auto max-h-96`}>
          {folders.map((folder) => (
            <Card 
              key={folder.id} 
              className="aspect-square p-4 cursor-pointer hover:shadow-md transition-shadow bg-muted/50"
              onClick={() => navigate(`/resources/folder/${folder.id}`)}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <Folder size={32} className="text-muted-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-sm text-foreground truncate">
                    {folder.name}
                  </h3>
                  {folder.itemCount > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {folder.itemCount} items
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;