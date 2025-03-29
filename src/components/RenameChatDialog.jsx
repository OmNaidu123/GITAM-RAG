import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toast } from "sonner";

const RenameChatDialog = ({ open, setOpen, renameChat, chatId }) => {
  const [newChatName, setNewChatName] = useState("");

  const handleRename = () => {
    if (!newChatName.trim()) {
      toast.error("Chat name cannot be empty.");
      return;
    }
    renameChat(chatId, newChatName);
    setNewChatName(""); // Clear input
  };

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Chat</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Input
              placeholder="Enter new chat name"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 p-3 rounded-lg"
            />
            <Button onClick={handleRename} className="bg-blue-600 text-white hover:bg-blue-700 transition">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RenameChatDialog;
