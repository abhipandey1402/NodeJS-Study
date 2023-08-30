import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";

function Header() {
  const userData = JSON.parse(localStorage.getItem("user"));
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

  const handleMyBlog = () => {
    window.location.href = "/myblogs";
  };

  const handleUsers = () => {
    window.location.href = "/users";
  };

  const handleHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="homepage_ui">
      <h1 className="m-5">Welcome {userData.username}</h1>
      <div>
        <Button className="m-1" onClick={handleHome}>
          Home
        </Button>
        <Button className="m-1" onClick={handleCreateBlog}>
          Create Blog
        </Button>
        <Button className="m-1" onClick={handleMyBlog}>
          My Blogs
        </Button>
        <Button className="m-1" onClick={handleUsers}>
          Users
        </Button>
        <Button className="m-1" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
