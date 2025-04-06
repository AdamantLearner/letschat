import { useEffect, useRef } from "react";

type Props = {
  messages: { name: string; text: string }[];
};

export default function MessageList({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`space-y-2 max-h-[calc(100dvh-180px)] overflow-y-auto  ${
        messages.length > 0 && "border"
      } p-2 rounded`}>
      {messages.map((msg, i) => (
        <div key={i} className="p-2 bg-gray-100 rounded text-black">
          <p>
            <strong className="">{msg.name}:</strong> {msg.text}
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
