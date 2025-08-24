import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

export default function TopBar({ user, dark, setDark }) {
  return (
    <Navbar className="topbar" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand className="fw-bold">
          💬 ChitChat
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Badge bg="secondary">Hi, {user}</Badge>
          <Form.Check
            type="switch"
            id="dark-mode"
            label="Dark"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
        </div>
      </Container>
    </Navbar>
  );
}
