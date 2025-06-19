import { useEffect, useState, useRef } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import "./App.css";

type ChatMessage = {
  text: string;
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat" && data.payload?.message) {
          setMessages((m) => [...m, { text: data.payload.message }]);
        }
      } catch {
        setMessages((m) => [...m, { text: event.data }]);
      }
    };
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
  }, []);

  const handleSend = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message },
        })
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-gray-900">
      <header className="bg-blue-800 shadow text-white text-center py-5 text-2xl font-extrabold tracking-wide">
        💬 Chat Application
      </header>
      <main className="flex-1 flex flex-col justify-end max-w-xl w-full mx-auto p-2">
        <div className="flex-1 overflow-y-auto rounded-lg bg-white/10 shadow-inner p-4 mb-2">
          <MessageList messages={messages} />
        </div>
        <div className="w-full">
          <MessageInput onSend={handleSend} />
        </div>
      </main>
    </div>
  );
}

export default App;