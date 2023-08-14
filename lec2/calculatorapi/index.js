const express = require("express");
const app = express();

//Creating endpoint for add operation
// Example query = "/add?num1=5&num2=10"
app.get("/add", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  const sum = num1 + num2;
  res.status(200).json(sum);
});

//Creating endpoint for subtract operation
// Example query = "/subtract?num1=5&num2=10"
app.get("/subtract", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  const difference = num1 - num2;
  res.status(200).json(difference);
});

//Creating endpoint for multiply operation
// Example query = "/multiply?num1=5&num2=10"
app.get("/multiply", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  const product = num1 * num2;
  res.status(200).json(product);
});

//Creating endpoint for divide operation
// Example query = "/divide?num1=5&num2=10"
app.get("/divide", (req, res) => {
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  if (num2 == 0) {
    res.status(500).send("Enter a valid number greater than 0!");
  }
  const quotient = num1 / num2;

  res.status(200).json(quotient);
});

app.listen(8001, () => {
  console.log("Server is running at 8001!");
});
