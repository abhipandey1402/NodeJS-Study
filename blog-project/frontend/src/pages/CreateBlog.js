import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState();
  const [textBody, setTextBody] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogObj = {
      title,
      textBody,
    };
    axios
      .post("http://localhost:8001/blog/createBlog", blogObj)
      .then((res) => {
        alert("Blog created successfully!");
        window.location.href = "/myblogs";
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div>
      <Form className="register_form" onSubmit={handleSubmit}>
        <h1 className="mb-5">Create a blog</h1>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="textBody">
          <Form.Label>Text Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Enter text body"
            onChange={(e) => setTextBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Blog</Button>
      </Form>
    </div>
  );
}

export default CreateBlog;
