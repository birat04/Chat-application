import React, { useEffect, useRef } from "react";

interface ChatMessage {
  text: string;
}

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex justify-start">
          <span className="inline-block px-4 py-2 rounded-xl shadow break-words bg-white/80 text-gray-900">
            {msg.text}
          </span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;