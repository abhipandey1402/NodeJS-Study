import axios from "axios";
import React, { useEffect, useState } from "react";

import BlogCard from "../components/Blogs/BlogCard";
import "../App.css";
import Header from "../components/Header";

function Homepage() {
  const [blogs, setBlogs] = useState();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/blog/homeblogs/${userData.userId}`
      )
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [userData.userId]);

  return (
    <div>
      <Header />
      {blogs ? blogs.map((blog) => <BlogCard props={blog} />) : <></>}
    </div>
  );
}

export default Homepage;
