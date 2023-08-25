const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 8001;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5086",
  database: "acciojob",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("DB Connected!");
});

app.get("/test", (req, res) => {
  let query = "SELECT * FROM customers WHERE gender='F'";

  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// GET - Fetch all todos based on a username
app.get("/todos/:username", (req, res) => {
  const username = req.params.username;

  let query = `SELECT * FROM todos WHERE username='${username}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST - Creating a new todo
app.post("/todo", (req, res) => {
  const { id, task, isCompleted, date, username } = req.body;

  let query = `INSERT INTO todos VALUES(${id}, '${task}', ${isCompleted}, '${date}', '${username}')`;
  db.query(query, (err, result) => {
    if (err) throw err;

    res.send("New todo has been created!");
  });
});

// PUT - Updating the details of a todo
app.put("/todo", (req, res) => {
  let query = "UPDATE todos SET ";

  if (req.body.task) {
    query += `task='${req.body.task}', `;
  }

  if (req.body.isCompleted) {
    query += `is_completed=${req.body.isCompleted}, `;
  }

  if (req.body.date) {
    query += `date='${req.body.date}' `;
  }

  query += `WHERE id='${req.body.id}'`;

  db.query(query, (err, result) => {
    if (err) throw err;

    res.send("Updated todo successfully!");
  });
});

// DELETE - Delete a todo based on id
app.delete("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  let query = `DELETE FROM todos WHERE id=${todoId}`;
  db.query(query, (err, result) => {
    if (err) throw err;

    res.send("Todo has been deleted!");
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
