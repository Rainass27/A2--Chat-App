import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

export default function ChatList({ chats, activeId, setActiveId }) {
  return (
    <div className="panel chat-list">
      <h5 className="mb-3">Chats</h5>
      <ListGroup variant="flush">
        {chats.map((c) => {
          const last = c.messages[c.messages.length - 1];
          return (
            <ListGroup.Item
              key={c.id}
              className={`chat-item ${activeId === c.id ? "active" : ""}`}
              onClick={() => setActiveId(c.id)}
            >
              <img
                src={c.img}   
                alt={c.name}
                width="40"
                height="40"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <div className="meta">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="name">{c.name}</div>
                  {c.online ? (
                    <Badge bg="success">online</Badge>
                  ) : (
                    <Badge bg="secondary">away</Badge>
                  )}
                </div>
                <div className="preview">
                  {last
                    ? `${last.sender === "me" ? "You: " : ""}${last.text}`
                    : "No messages yet"}
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
