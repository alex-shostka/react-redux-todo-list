const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const cors = require("cors");

/* get data from server */
router.get("/", cors(), async (req, res, next) => {
  const task = await Todo.find();
  res.json({ task });
});

/* send data to BD */
router.post("/", cors(), async (req, res, next) => {
  const { task } = req.body;
  const newTask = new Todo({ task });
  await newTask.save();
  // res.json({ newTask });
  res.send(newTask);
});

/* mark todo as isDone */
router.patch("/:id", cors(), async (req, res, next) => {
  const { done } = req.body;
  const todos = await Todo.findById(req.params.id);
  if (done) {
    todos.isDone = !todos.isDone;
    await todos.save();
  }
  res.send(todos);
});

/* del todo */
router.delete('/:id', cors(), async (req, res, next) => {
  const todos = await Todo.findById(req.params.id);
  if (todos) {
    todos.isVisible = !todos.isVisible;
    await todos.save();
  }
  res.send(todos);
});

// для подключения облачной БД замени это строчку в файле .env
// CONNECTION = mongodb+srv://alex:alex@redux-todo.8u1pm.mongodb.net/redux-todo?retryWrites=true&w=majority

module.exports = router;
