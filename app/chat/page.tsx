"use client";

import ChatInputBox from "@/components/ChatInputBox";
import MessageList from "@/components/MessageList";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ name: string; text: string }[]>(
    []
  );
  const [name] = useState("Anonymous");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage = { name, text };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4 w-full h-full">
      <h1 className="text-2xl font-bold">Just Chat</h1>
      <MessageList messages={messages} />
      <ChatInputBox onSend={sendMessage} />
    </main>
  );
}
