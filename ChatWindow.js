import { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";

export default function ChatWindow({ chat, me }) {
  const scrollRef = useRef(null);
  const [typing, setTyping] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  // Simulated typing indicator
  useEffect(() => {
    if (!chat) return;
    const last = chat.messages[chat.messages.length - 1];
    if (last && last.sender === "me") {
      setTimeout(() => setTyping(true), 300);
      setTimeout(() => setTyping(false), 900);
    }
  }, [chat]);

  if (!chat) return null;

  return (
    <Card className="panel flex-grow-1 d-flex">
      <Card.Header className="d-flex align-items-center gap-2">
        <img
          src={chat.img}   
          alt={chat.name}
          width="36"
          height="36"
          style={{ borderRadius: "50%" }}
        />
        <div>
          <div className="fw-semibold">{chat.name}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {chat.online ? "Online" : "Last seen recently"}
          </div>
        </div>
      </Card.Header>

      <Card.Body ref={scrollRef} className="chat-window">
        {chat.messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.sender === "me" ? "me" : "them"}`}
          >
            <span>{m.text}</span>
            <span className="msg-time">{m.time}</span>
          </div>
        ))}

        {typing && (
          <div className="message them">
            <span>typing…</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
