import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Folder, Plus } from "lucide-react";

interface FolderSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToFolder: (folderId: string) => void;
  resourceTitle: string;
}

const FolderSelectionDialog: React.FC<FolderSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSaveToFolder,
  resourceTitle
}) => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folders, setFolders] = useState([]);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Get folders from localStorage (same as Resources page)
  const getFolders = () => {
    const savedFolders = localStorage.getItem('scrapbook-folders');
    return savedFolders ? JSON.parse(savedFolders) : [
      { id: 'uncategorized', name: 'Uncategorized', itemCount: 2 }
    ];
  };

  // Load folders when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setFolders(getFolders());
    }
  }, [isOpen]);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: newFolderName.trim(),
        itemCount: 0
      };
      
      const currentFolders = getFolders();
      const uncategorized = currentFolders.find(f => f.id === 'uncategorized');
      const otherFolders = currentFolders.filter(f => f.id !== 'uncategorized');
      const updatedFolders = [uncategorized, ...otherFolders, newFolder].filter(Boolean);
      
      localStorage.setItem('scrapbook-folders', JSON.stringify(updatedFolders));
      setFolders(updatedFolders);
      setSelectedFolder(newFolder.id);
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const handleSave = () => {
    if (selectedFolder) {
      onSaveToFolder(selectedFolder);
      onClose();
      setSelectedFolder('');
      setShowNewFolderInput(false);
      setNewFolderName('');
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedFolder('');
    setShowNewFolderInput(false);
    setNewFolderName('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Resource to Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Save "{resourceTitle}" to a folder:
          </p>
          
           <RadioGroup value={selectedFolder} onValueChange={setSelectedFolder}>
            {folders.map((folder) => (
              <div key={folder.id} className="flex items-center space-x-2">
                <RadioGroupItem value={folder.id} id={folder.id} />
                <Label htmlFor={folder.id} className="flex items-center gap-2 cursor-pointer">
                  <Folder size={16} className="text-muted-foreground" />
                  {folder.name}
                  {folder.itemCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({folder.itemCount} items)
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Create New Folder Section */}
          {showNewFolderInput ? (
            <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2">
                <Plus size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Create New Folder</span>
              </div>
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewFolderInput(false);
                    setNewFolderName('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                  className="bg-[#39403B] hover:bg-[#39403B]/90 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowNewFolderInput(true)}
              className="w-full justify-start gap-2"
            >
              <Plus size={16} />
              Create New Folder
            </Button>
          )}
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!selectedFolder}
              className="bg-[#39403B] hover:bg-[#39403B]/90 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderSelectionDialog;