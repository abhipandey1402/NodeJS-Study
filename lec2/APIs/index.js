const express = require("express");
const app = express();

app.get("/helloworld", (req, res) => {
  res.status(200).json({
    data: {
      name: "Anurag",
      place: "Delhi",
      interests: ["Football", "Gym", "Coding"],
    },
  });
});

app.get("/profile/:userid", (req, res) => {
  const userid = req.params.userid;
  // database call to fetch the data of the userid
  const userData = "db call";
  res.status(200).json(userData);
});

app.get("/profile", (req, res) => {
  const name = req.query.name;
  const place = req.query.place;
  console.log(name);
  console.log(place);
});

app.get("/products", (req, res) => {
  if (!req.query) {
    // find the product with the product id
  }

  // find all products and send to client
});

app.listen(8001, () => {
  console.log("Server is running at 8001 port!");
});
