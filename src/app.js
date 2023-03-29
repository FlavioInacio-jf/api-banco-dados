require("express-async-errors");
require("reflect-metadata");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const express = require("express");
const { Router } = require("express");

const usersDoc = require("./docs/user");

const app = express();
const router = Router();

app.use(cors());
app.use(express.json());

router.get("/", (req, res) => {
  return res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(usersDoc));



/**
 * Routes
 */

router.get("/users", (req, res) => {
  res.json({ title: "teste" })
})
router.post("/users", (req, res) => {
  res.json({ title: "teste" })
})
app.use(router);


app.use((err, req, res, next) => {
  return res.status(500).json({
    title: "Erro interno",
    detail: `Erro interno do servidor - ${err.message}`
  })
})

module.exports = app;