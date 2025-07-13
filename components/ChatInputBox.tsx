// components/ChatBox.tsx
"use client";

import { useState, KeyboardEvent } from "react";

type ChatBoxProps = {
  onSend: (message: string) => void;
};
export default function ChatBox({ onSend }: ChatBoxProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSend(text);
    setText("");
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="px-3 py-2 flex-1 rounded outline-none focus:border focus:border-blue-500 transition-all"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}
