import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";

function MyBlogs() {
  const [page, setPage] = useState(1);
  const [myBlogs, setMyBlogs] = useState();
  const userData = localStorage.getItem("user");

  useEffect(() => {
    axios.get("http://localhost:8001/blog/getUserBlogs").then((res) => {
      console.log(res);
      setMyBlogs(res.data.data);
    });
  }, []);

  return (
    <>
      <h1>djkhfnj</h1>
      {/* {myBlogs.map((blog) => (
        <BlogCard props={blog} />
      ))} */}
    </>
  );
}

export default MyBlogs;
