"use client";

import ChatInputBox from "@/components/ChatInputBox";
import MessageList from "@/components/MessageList";
import { useState, useEffect } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { name: string; text: string; id: number }[]
  >([]);
  console.log("🚀 ~ ChatPage ~ messages:", messages);

  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  // const [messageId, setMessageId] = useState(Date.now());

  // Load messages from localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem("messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }

    // Listen for messages from other tabs
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === "messages") {
        const updated = JSON.parse(e.newValue || "[]");
        setMessages(updated);
      }
    };
    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const joinChat = (username: string) => {
    if (!username.trim()) return;
    setName(username);
    setJoined(true);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      name,
      text,
      id: Date.now(), // Use timestamp as ID
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  if (!joined) {
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Join Chat</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              joinChat(e.currentTarget.value);
            }
          }}
        />
      </div>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4 w-full h-full">
      <h1 className="text-2xl font-bold">Just Chat</h1>
      <div className="text-sm">Chatting as: {name}</div>
      <MessageList messages={messages} />
      <ChatInputBox onSend={sendMessage} />
    </main>
  );
}
