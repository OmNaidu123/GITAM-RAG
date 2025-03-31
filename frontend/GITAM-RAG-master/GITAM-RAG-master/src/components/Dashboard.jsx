import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toaster, toast } from "sonner";
import { Plus, Search, Trash, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DrawerDialogDemo } from "@/components/DrawerDialogDemo";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

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

const Dashboard = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ragMode, setRagMode] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      searchChats(searchTerm);
    } else {
      fetchChats();
    }
  }, [searchTerm]);

  const fetchChats = async () => {
    try {
      const response = await api.get(`/chat/get/account/${username}`);
      setChats(response.data);
    } catch {
      toast.error("API failed, loading dummy chats.");
      setChats([
        { id: 1, username, chatName: "Math Homework" },
        { id: 2, username, chatName: "AI Research" },
        { id: 3, username, chatName: "Project Discussion" },
      ]);
    }
  };

  const searchChats = async (keyword) => {
    try {
      const response = await api.get(`/chat/search/${username}/${keyword}`);
      if (response.status === 200) {
        setChats(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to search chats.");
    }
  };

  const fetchChatHistory = async (chatId) => {
    try {
      const response = await api.get(`/fetch/${chatId}`);
      setChatHistory(response.data);
    } catch {
      toast.error("API failed, loading dummy messages.");
      setChatHistory([
        { message: "Hello, how can I help?", user: false },
        { message: "What is calculus?", user: true },
        { message: "Calculus is about limits, functions, and derivatives.", user: false },
      ]);
    }
  };

  const createChat = async (chatName) => {
    if (!chatName.trim()) return;

    try {
      const response = await api.post("/chat/create", { username, chatName });
      if (response.status === 200) {
        toast.success("Chat created!");
        fetchChats();
      }
    } catch {
      toast.error("Chat creation failed.");
    }
  };

  const deleteChat = async (id) => {
    try {
      await api.delete(`/chat/delete/${id}`);
      toast.success("Chat deleted!");
      setChats(chats.filter((chat) => chat.id !== id));
      setSelectedChat(null);
      setChatHistory([]);
    } catch {
      toast.error("Failed to delete chat.");
    }
  };

  const renameChat = async (id) => {
    const newName = prompt("Enter new chat name:");
    if (!newName) return;

    try {
      const response = await api.post(`/chat/edit/${id}/${newName}`);
      if (response.status === 200) {
        toast.success("Chat renamed!");
        fetchChats();
      }
    } catch {
      toast.error("Failed to rename chat.");
    }
  };

  const sendMessage = async () => {
    if (!selectedChat || !message.trim()) return;

    const newMessage = { message, user: true };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setMessage("");

    try {
      const response = await api.post("/question", {
        username,
        chatId: selectedChat.id,
        ragMode,
        question: message,
      });

      if (response.status === 200) {
        const botMessage = { message: response.data, user: false };
        setChatHistory((prevHistory) => [...prevHistory, botMessage]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  // Debounce handler to prevent too many API calls
  const handleSearch = useCallback(debounce((value) => {
    setSearchTerm(value);
  }, 300), []);

  return (
    <div className="flex h-screen bg-black text-white">
      <Toaster position="top-right" />

      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-700 p-6 border-r border-gray-700 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold">Chats</h1>
          <DrawerDialogDemo fetchChats={fetchChats} />
        </div>

        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white text-xl p-5 placeholder-gray-500"
          />
        </div>

        <div className="flex-grow overflow-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 mb-2 rounded-lg flex justify-between items-center cursor-pointer ${
                selectedChat?.id === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setSelectedChat(chat);
                fetchChatHistory(chat.id);
              }}
            >
              <span className="font-bold">{chat.chatName}</span>
              <div className="flex gap-2">
                <Button onClick={() => renameChat(chat.id)} className="bg-white text-black p-2">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button onClick={() => deleteChat(chat.id)} className="bg-red-600 text-white p-2">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col h-full">
        {selectedChat ? (
          <>
            <div className="p-4 bg-gray-900 flex justify-between items-center border-b border-gray-700">
              <h2 className="text-xl font-bold">{selectedChat.chatName}</h2>
              <div className="flex items-center gap-2">
                <Label className="font-bold">RAG Mode</Label>
                <Switch checked={ragMode} onCheckedChange={setRagMode} />
              </div>
            </div>

            <div className="flex-grow p-5 overflow-y-auto space-y-2">
    {chatHistory.map((msg, index) => (
    <div 
      key={index} 
      className={`p-3 rounded-md max-w-lg ${msg.user ? "ml-auto bg-gray-600" : "mr-auto bg-gray-800"}`}
    >
      <pre className="whitespace-pre-wrap">{msg.message}</pre>
    </div>
  ))}
</div>


            <div className="p-4 bg-gray-900 flex items-center">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500">
            <p className="text-xl font-bold">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;