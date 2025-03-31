import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Plus } from "lucide-react"; // ✅ Import Plus from lucide-react
const api = axios.create({
  baseURL: "http://localhost:8080",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function DrawerDialogDemo({ fetchChats }) {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const username = localStorage.getItem('username') || ""; // Replace with actual username

  const createChat = async () => {
    if (!chatName.trim()) return;

    try {
      const response = await api.post("/chat/create", { username, chatName });
      if (response.status === 200) {
        toast.success("Chat created!");
        setOpen(false);
        setChatName(""); // Reset input after creation
        fetchChats(); // Refresh chat list
      }
    } catch(err) {
      console.error(err.message);
      toast.error("Chat creation failed.");
    }
  };
  

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white text-black border border-gray-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> New Chat 
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="chatName">Chat Name</Label>
              <Input
                id="chatName"
                placeholder="Enter chat name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
            <Button onClick={createChat} className="bg-black text-white hover:bg-gray-700 transition">
              Create Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
