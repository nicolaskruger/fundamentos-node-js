const express = require("express");
const uuid = require("uuid");

const acount = [];

const app = express();

app.use(express.json());

app.get("/courses", (req, res) => {
  const query = req.query;
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.post("/courses", (req, res) => {
  const body = req.body;
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.patch("/courses/:id", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["Curson 1", "Curson 2", "Curson 3"]);
});

app.post("/account", (req, res) => {
  const newUser = { ...req.body, id: uuid.v4(), statement: [] };
  if (acount.some((user) => user.cpf === newUser.cpf))
    return res.status(400).json({
      msg: "cpf already in use",
    });
  acount.push(newUser);
  return res.status(201).json({
    msg: "created",
    id: newUser.id,
  });
});

app.listen(3333);
