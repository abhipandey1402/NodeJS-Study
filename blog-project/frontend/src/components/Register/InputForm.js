import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./InputForm.css";

function InputForm() {
  const handleSubmit = () => {};
  return (
    <Form className="register_form" onSubmit={handleSubmit}>
      <h1 className="mb-5">Register into Blog App</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter a password" />
      </Form.Group>

      <Button type="submit">Register</Button>
    </Form>
  );
}

export default InputForm;
