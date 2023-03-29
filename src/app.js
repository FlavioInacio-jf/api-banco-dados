require("express-async-errors");
require("reflect-metadata");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const express = require("express");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const usersDoc = require("./docs/user");

const app = express();
const router = Router();

app.use(cors());
app.use(express.json());

router.get("/", (req, res) => {
  return res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(usersDoc));

let users = [];

const getUserByCPF = (cpf) => {
  const userExists = users.find((user) => user.cpf === cpf);
  return userExists;
}

const addUser = (user) => {
  const userExists = getUserByCPF(user.cpf);

  if (userExists) {
    throw new Error("Já existe um usuário cadastrado no sistema com este CPF");
  }
  users = [...users, user];
}

/**
 * Routes
 */

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  try {
    const user = getUserByCPF(id)
    if (!user) {
      throw new Error("usuário não existe");
    }
    return res.json({ result: user })
  }catch(err){
    return res.status(404).json({
      title: "Usuário não encontrado",
      detail: `${err.message}`
    })
  }
})
router.post("/users", (req, res) => {
  const data = req.body;

  try {
    const user = {
      _id: uuidv4(),
      cpf: data.cpf,
      nome: data.nome,
      nascimento: data.nascimento,
    }
    addUser(user);
    return res.status(201).json({ title: "usuário criado com sucesso", usuario: user });
  }catch(err) {
    return res.status(409).json({
      title: "Usuário já cadastrado no sistema",
      detail: `${err.message}`
    })
  }
})
app.use(router);


app.use((err, req, res, next) => {
  return res.status(500).json({
    title: "Erro interno",
    detail: `Erro interno do servidor - ${err.message}`
  })
})

module.exports = app;