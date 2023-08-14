const express = require("express");
const app = express();

app.use(express.json());

// //calculator API using params

// // add
// app.get("/add/:num1/:num2", (req, res) => {
//   const num1 = parseInt(req.params.num1);
//   const num2 = parseInt(req.params.num2);

//   const sum = num1 + num2;

//   res.status(200).json(sum);
// });

// // subtract
// app.get("/subtract/:num1/:num2", (req, res) => {
//   const num1 = parseInt(req.params.num1);
//   const num2 = parseInt(req.params.num2);

//   const difference = num1 - num2;

//   res.status(200).json(difference);
// });

// // multiply
// app.get("/multiply/:num1/:num2", (req, res) => {
//   const num1 = parseInt(req.params.num1);
//   const num2 = parseInt(req.params.num2);

//   const product = num1 * num2;

//   res.status(200).json(product);
// });

// // divide
// app.get("/divide/:num1/:num2", (req, res) => {
//   const num1 = parseInt(req.params.num1);
//   const num2 = parseInt(req.params.num2);

//   //the below check is an exception which occurs when num2 gets 0
//   if (num2 <= 0) {
//     res.status(400).send("Please enter a valid number2");
//   }

//   const quotient = num1 / num2;

//   res.status(200).json(quotient);
// });

// ----------------------------------------
// Calculator API using Body data

// add
app.post("/add", (req, res) => {
  //   const num1 = req.body.num1;
  //   const num2 = req.body.num2;

  //   const sum = num1 + num2;
  //   res.status(200).json(sum);

  const numsArray = req.body.nums;
  let sum = 0;

  for (let i = 0; i < numsArray.length; i++) {
    sum += numsArray[i];
  }

  res.status(200).json(sum);
});

// subtract
app.post("/subtract", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  const difference = num1 - num2;
  res.status(200).json(difference);
});

// multiply

// divide

app.listen(8001, () => {
  console.log("Server is running at 8001!");
});
