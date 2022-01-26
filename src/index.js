const { request, response } = require("express");
const express = require("express");
const uuid = require("uuid");

const customers = [];

const app = express();

app.use(express.json());

const verifyIfExistsAccountCPF = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((user) => user.cpf === cpf);

  if (!customer) {
    return response.status(400).json({
      msg: "costumer not found",
    });
  }

  request.customer = customer;

  return next();
};

const getBalance = (statement) => {
  const balance = statement.reduce((acc, curr) => {
    if (curr.type === "credit") {
      return acc + curr.amount;
    } else {
      return acc - curr.amount;
    }
  }, 0);

  return balance;
};

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
  if (customers.some((user) => user.cpf === newUser.cpf))
    return res.status(400).json({
      msg: "cpf already in use",
    });
  customers.push(newUser);
  return res.status(201).json({
    msg: "created",
    id: newUser.id,
  });
});

app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const date = new Date(req.query.date + " 00:00");
  return res.json(
    customer.statement.filter(
      (operation) => new Date(operation.created_at).getTime() === date.getTime()
    )
  );
});

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  return res.json(req.customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const created_at = new Date();
  created_at.setHours(0, 0, 0, 0);

  customer.statement.push({
    description,
    amount,
    created_at,
    type: "credit",
  });

  return res.status(201).json({
    msg: "deposit with succes",
  });
});

app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({
      msg: "not enough cash",
    });
  }

  customer.statement.push({
    description,
    amount,
    created_at: new Date(),
    type: "withdraw",
  });

  return res.status(201).json({
    msg: "withdraw with succes",
  });
});

app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body;

  const { customer } = req;

  customer.name = name;

  return res.status(200).json({
    msg: "atualizado com sucesso",
  });
});

app.get("/account", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    ...customer,
  });
});

app.listen(3333);
