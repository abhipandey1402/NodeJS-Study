const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/TodoSchema");
const User = require("./models/UserSchema");
const bcrypt = require("bcrypt");
const { LoggerMiddleware } = require("./middlewares/LoggerMiddleware");
const { isAuth } = require("./middlewares/AuthMiddleware");
const { isUserExisting } = require("./utils/UsernameCheck");
require("dotenv").config();
const PORT = 8001;
const SALT_ROUNDS = 10;

app.use(express.json());

app.use(LoggerMiddleware);

// POST - Creating new User
app.post("/register", async (req, res) => {
  const userBody = req.body;
  const userExists = await isUserExisting(userBody.username);

  if (userExists) {
    res.send({ status: 400, message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(userBody.password, SALT_ROUNDS);
  const userObj = new User({
    username: userBody.username,
    password: hashedPassword,
    email: userBody.email,
  });

  await userObj.save();

  res.status(200).send("User has been created!");
});

// POST - Login user
app.post("/login", async (req, res) => {
  try {
    const loginBody = req.body;
    const userData = await User.findOne({ username: loginBody.username });

    const isPasswordSame = await bcrypt.compare(
      loginBody.password,
      userData.password
    );

    if (!isPasswordSame) {
      res.status(400).send("Your password is incorrect");
    } else {
      res.status(200).send("You are logged in!");
    }
  } catch (e) {
    res.status(500).send("Internal server error!");
  }
});

// GET - fetch all todos
app.get("/todos/:username", isAuth, async (req, res) => {
  try {
    const username = req.params.username;
    const todos = await Todo.find({ username }).sort({ time: 1 });
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

// GET - fetch single todo based on id
app.get("/todo/:id", isAuth, async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoObj = await Todo.findById(todoId);

    res.status(200).json(todoObj);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

// POST - Creating a new Todo
app.post("/todo", isAuth, async (req, res) => {
  const { task, isCompleted, username } = req.body;

  if (task.length == 0 || isCompleted == null || username.legnth == 0) {
    res.send({
      status: 400,
      message: "Please enter the values in correct format!",
    });
  }

  try {
    const todoObj = new Todo({
      task: task,
      isCompleted: isCompleted,
      username: username,
    });

    await todoObj.save();
    res.status(200).send("New todo is created!");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// DELETE - Deleting a todo based on id
app.delete("/todo/:id", isAuth, async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findByIdAndDelete(todoId);

    res.status(200).send("Todo is deleted successfully");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

// PUT - Update a todo based on id
app.put("/todo", isAuth, async (req, res) => {
  try {
    const updatedTodoData = req.body;
    await Todo.findByIdAndUpdate(updatedTodoData.id, {
      isCompleted: updatedTodoData.isCompleted,
    });

    res.status(200).send("Todo succesfully updated!");
  } catch (e) {
    res.status(500).send("Internal server error");
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
