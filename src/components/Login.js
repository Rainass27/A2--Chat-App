import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin(name.trim());
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
      <Card className="p-4 panel" style={{maxWidth: 420, width:"100%"}}>
        <h4 className="mb-3">Welcome to ChitChat</h4>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter a display name</Form.Label>
            <Form.Control
              placeholder="e.g., Raina"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Continue
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
