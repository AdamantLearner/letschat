"use client";

import ChatInputBox from "@/components/ChatInputBox";
import MessageList from "@/components/MessageList";
import { UserContext } from "@/context/user-context";
import { useState, useEffect, useContext } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ name: string; text: string }[]>(
    []
  );
  const user = useContext(UserContext);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  // const [messageId, setMessageId] = useState(Date.now());
  useEffect(() => {
    const storedName = localStorage.getItem("chatUserName");
    if (storedName) {
      setName(storedName);
      setJoined(true);
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/message", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error("Failed to send message");
        return;
      }
      const allChatsData = await res.json();

      setMessages(allChatsData);
    }

    fetchData();
    // Load messages from localStorage on load
    // const onStorageChange = (e: StorageEvent) => {
    //   if (e.key === "messages") {
    //     const updated = JSON.parse(e.newValue || "[]");
    //     setMessages(updated);
    //   }
    // };
    // window.addEventListener("storage", onStorageChange);

    // return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const joinChat = (username: string) => {
    if (!username.trim()) return;
    setName(username);
    setJoined(true);
    localStorage.setItem("chatUserName", username); // Save to localStorage
  };
  //   const sendMessage = async (text: string) => {
  //   if (!text.trim()) return;

  //   const newMessage = { name, text };

  //   const res = await fetch("/api/messages", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newMessage),
  //   });

  //   if (!res.ok) {
  //     console.error("Failed to send message");
  //     return;
  //   }

  //   const savedMessage = await res.json();
  //   setMessages((prev) => [...prev, savedMessage]);
  // };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      name,
      text,
    };
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    if (!res.ok) {
      console.error("Failed to send message");
      return;
    }

    const savedMessage = await res.json();
    //api returns the saved message and that is appended to the messages state
    setMessages((prev) => [...prev, savedMessage.message]);
    // localStorage.setItem("messages", JSON.stringify(updatedMessages));
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
    <main className="max-w-xl mx-auto p-4 space-y-4 w-full h-full bg-blue-100">
      <h1 className="text-2xl font-bold bg-blue-300 rounded px-2">Just Chat</h1>
      <div className="text-sm">Chatting as: {name}</div>
      <MessageList messages={messages} currentUser={name} />
      <ChatInputBox onSend={sendMessage} />
    </main>
  );
}
