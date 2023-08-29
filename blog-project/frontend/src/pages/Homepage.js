import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";

function Homepage() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    axios
      .post("http://localhost:8001/user/logout")
      .then((res) => console.log(res.data))
      .catch((err) => alert(err));
  };

  const handleCreateBlog = () => {
    window.location.href = "/createblog";
  };
  return (
    <div>
      <h1>Homepage</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={handleCreateBlog}>Create Blog</Button>
    </div>
  );
}

export default Homepage;
