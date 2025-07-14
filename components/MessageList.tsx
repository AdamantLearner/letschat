import { useEffect, useRef } from "react";

type Props = {
  messages: { name: string; text: string }[];
  currentUser: string;
};

export default function MessageList({ messages, currentUser }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`space-y-2 h-[calc(100dvh-180px)] md:h-auto md:max-h-[calc(100dvh-230px)] overflow-y-auto hide-scrollbar  ${
        messages.length > 0 && "border"
      } p-2 rounded`}>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`p-2 bg-gray-100 rounded text-black w-fit ${
            msg.name === currentUser ? "ml-auto bg-blue-200" : "mr-auto"
          }`}>
          <p>
            <strong>{msg.name}:</strong> {msg.text}
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
