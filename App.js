import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopBar from "./components/TopBar";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

import "./App.css";

// ✅ Images now from /public/images/
const initialChats = [
  {
    id: "Aadhya",
    name: "Aadhya",
    img: "/images/Aadhya.jpg",
    online: true,
    messages: [
      { sender: "aadhya", text: "Hey! Ready for lunch?", time: "10:02 AM" },
      { sender: "me", text: "yessss 😄", time: "10:03 AM" },
    ],
  },
  {
    id: "Deeva",
    name: "Deeva",
    img: "/images/deeva.jpg",
    online: false,
    messages: [{ sender: "deeva", text: "Call me when free", time: "09:30 AM" }],
  },
  {
    id: "Prathishta",
    name: "Prathishta",
    img: "/images/prats.jpg",
    online: true,
    messages: [{ sender: "prathishta", text: "Bro our idea is 🔥", time: "08:15 AM" }],
  },
  {
    id: "Tarini",
    name: "Tarini",
    img: "/images/tarini.jpg",
    online: true,
    messages: [{ sender: "tarini", text: "Are you busy?", time: "08:15 AM" }],
  },
  {
    id: "Zaina",
    name: "Zaina",
    img: "/images/zaina.jpg",
    online: true,
    messages: [{ sender: "zaina", text: "Come to my room pls", time: "08:15 AM" }],
  },
];

export default function App() {
  const [user, setUser] = useState(null); // Login
  const [dark, setDark] = useState(false); // Dark mode toggle
  const [chats, setChats] = useState(initialChats); // All chats
  const [activeId, setActiveId] = useState("Aadhya");

  const activeChat = chats.find((c) => c.id === activeId);

  const handleSend = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add my message
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, { sender: "me", text, time }] }
          : c
      )
    );

    // Simulated reply after 800ms
    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    sender: activeId,
                    text: "ok got it 👍",
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              }
            : c
        )
      );
    }, 800);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className={dark ? "app dark" : "app"}>
      <TopBar user={user} dark={dark} setDark={setDark} />
      <Container fluid className="py-3">
        <Row className="g-3">
          {/* Sidebar */}
          <Col xs={12} md={4} lg={3}>
            <ChatList chats={chats} activeId={activeId} setActiveId={setActiveId} />
          </Col>

          {/* Chat area */}
          <Col xs={12} md={8} lg={9} className="d-flex flex-column">
            <ChatWindow chat={activeChat} me={user} />
            <MessageInput onSend={handleSend} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
