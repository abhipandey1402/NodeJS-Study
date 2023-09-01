import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import Header from "../components/Header";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(process.env.SERVER_URL);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/blog/getUserBlogs/${userData.userId}`
      )
      .then((res) => {
        setMyBlogs(res.data.data);
      });
  }, [userData.userId]);

  return (
    <>
      <Header />
      <h1 className="m-5">My Blogs</h1>
      {myBlogs ? myBlogs.map((blog) => <BlogCard props={blog} />) : <></>}
    </>
  );
}

export default MyBlogs;
