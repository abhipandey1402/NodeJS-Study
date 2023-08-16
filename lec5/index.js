const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./TodoSchema");
const PORT = 8001;

app.use(express.json());

app.post("/todo", (req, res) => {
  try {
    const todoObj = new Todo({
      task: req.body.task,
      isCompleted: req.body.isCompleted,
    });

    todoObj.save();
    res.status(200).send("New todo is created!");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

mongoose
  .connect(
    "mongodb+srv://anurag123:anurag123@cluster0.4faxcvs.mongodb.net/todoapp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
