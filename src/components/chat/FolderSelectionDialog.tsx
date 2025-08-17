import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Folder } from "lucide-react";

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

  // Get folders from localStorage (same as Resources page)
  const getFolders = () => {
    const savedFolders = localStorage.getItem('scrapbook-folders');
    return savedFolders ? JSON.parse(savedFolders) : [
      { id: 'all-clippings', name: 'All clippings', itemCount: 0 }
    ];
  };

  const folders = getFolders();

  const handleSave = () => {
    if (selectedFolder) {
      onSaveToFolder(selectedFolder);
      onClose();
      setSelectedFolder('');
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedFolder('');
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
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!selectedFolder}
              className="bg-[#39403B] hover:bg-[#39403B]/90"
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