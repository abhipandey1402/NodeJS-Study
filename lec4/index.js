const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8001;

app.use(express.json());

// GET - Get a single todo
app.get("/todo/:id", (req, res) => {
  try {
    const todoId = req.params.id;
    const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    const todosList = fileData.todos;

    var todoWithId = todosList.filter((t) => t.id == todoId);
    res.status(200).json(todoWithId[0]);
  } catch (err) {
    res.status(500).json({ messsage: err });
  }
});

// GET - Get all todos
app.get("/todos", (req, res) => {
  try {
    const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    const todos = fileData.todos;

    res.status(200).json({ data: todos });
  } catch (err) {
    res.status(500).json({ messsage: err });
  }
});

// POST - Create a new todo
app.post("/todo", (req, res) => {
  try {
    const newTodo = req.body;

    const fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    fileData.todos.push(newTodo);
    fs.writeFileSync("./database.json", JSON.stringify(fileData));

    res.status(201).send("Todo is succesfully created!");
  } catch (err) {
    res.status(500).json({ messsage: err });
  }
});

// PUT - Update a todo
app.put("/todo", (req, res) => {
  const todoId = req.body.id;
  const updatedTodoBody = req.body;

  let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
  let todosList = fileData.todos;

  for (let i = 0; i < todosList.length; i++) {
    if (todosList[i].id == todoId) {
      fileData.todos[i] = updatedTodoBody;
      break;
    }
  }

  fs.writeFileSync("./database.json", JSON.stringify(fileData));
  res.status(200).send("Todo is updated succesfully!");
});

// DELETE - Delete a todo
app.delete("/todo/:id", (req, res) => {
  try {
    const todoId = req.params.id;

    let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
    let todosList = fileData.todos;

    var listOfTodosAfterDeleting = todosList.filter((t) => t.id != todoId);

    fileData.todos = listOfTodosAfterDeleting;

    fs.writeFileSync("./database.json", JSON.stringify(fileData));
    res.status(200).send("Todo is deleted succesfully!");
  } catch (err) {
    res.status(500).json({ messsage: err });
  }
});

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
