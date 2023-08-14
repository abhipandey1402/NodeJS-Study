// ES6 import express from "express"

// ES5
const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  return res.send("Server is running ! Yayy");
});

app.listen(8001, () => {
  console.log("Your server is running at port 8001");
});
