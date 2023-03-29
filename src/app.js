require("express-async-errors");
require("reflect-metadata");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const express = require("express");
const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");

const CustomError = require("./errors/CustomError")
const doc = require("./docs/doc");

const app = express();
const router = Router();

app.use(cors());
app.use(express.json());

router.get("/", (req, res) => {
  return res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(doc));

let users = [];

const validateFields = (user) => {
  if (!user.nome) throw new CustomError({
    title: "NOME não informado",
    detail:"É preciso fornecer o NOME do usuário",
    code: 400,
  });
  if (!user.cpf) throw new CustomError({
    title: "CPF não informado",
    detail:"É preciso fornecer o CPF do usuário",
    code: 400,
  });
  if (!user.nascimento) throw new CustomError({
    title: "NASCIMENTO não informado",
    detail:"É preciso fornecer a data de NASCIMENTO do usuário",
    code: 400,
  });
}
const getUserByCPF = (cpf) => {
  const userExists = users.find((user) => user.cpf === cpf);
  return userExists;
}

const addUser = (user) => {
  const userExists = getUserByCPF(user.cpf);

  if (userExists) {
    throw new CustomError({
      title: "Usuário já foi cadastrado",
      detail: "Já existe um usuário cadastrado no sistema com este CPF",
      code: 409,
    });
  }
  users = [...users, user];
}

/**
 * Routes
 */

router.get("/users/:cpf", (req, res) => {
  const cpf = req.params.cpf;
  try {
    const user = getUserByCPF(cpf)
    if (!user) {
      throw new CustomError({
        title: "Usuário não encontrado",
        detail:"Não existe um usuário com o CPF informado",
        code: 404,
      });
    }
    return res.status(200).json({ result: user })
  }catch(err){
    return res.status(err.code || 400).json(err)
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
    validateFields(user);

    addUser(user);
    return res.status(201).json({ title: "usuário criado com sucesso", usuario: user });
  }catch(err) {
    return res.status(err.code || 400).json(err)
  }
})
app.use(router);


app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    const { code, ...rest } = err;
    return res.status(code).json(rest);
  }
  return res.status(500).json({
    title: "Erro interno",
    detail: `Erro interno do servidor - ${err.message}`
  })
})

module.exports = app;