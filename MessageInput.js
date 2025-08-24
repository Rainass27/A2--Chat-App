import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmojiPicker from "emoji-picker-react"; // ✅ default export

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const boxRef = useRef(null);

  const handleSend = () => {
    const msg = text.trim();
    if (!msg) return;
    onSend(msg);
    setText("");
    setShowEmoji(false);
  };

  // v4 signature: (emojiData, event)
  const handleEmojiClick = (emojiData /* , event */) => {
    setText((prev) => prev + emojiData.emoji); // ✅ use .emoji
  };

  return (
    <div
      ref={boxRef}
      className="p-2 d-flex align-items-center gap-2 position-relative"
    >
      <Button
        variant="light"
        title="Emoji"
        onClick={() => setShowEmoji((s) => !s)}
        style={{ fontSize: 20 }}
      >
        😀
      </Button>

      {showEmoji && (
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            left: "8px",
            zIndex: 2000,
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            emojiStyle="native"
          />
        </div>
      )}

      <Form.Control
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button variant="primary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}
