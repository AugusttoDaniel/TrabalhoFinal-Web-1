
const db = require("./db/models");
const express = require("express");
const cors = require('cors'); 
const cliente = require("./db/controllers/cliente");
const produto = require("./db/controllers/produto");
const pedido = require("./db/controllers/pedido");
const itempedido = require("./db/controllers/itempedido");


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5501", // Update this to the origin of your front-end app
  optionsSuccessStatus: 200
}));
app.use("/", cliente);
app.use("/", produto);
app.use("/", pedido);
app.use("/", itempedido);
app.listen(8080, () => {
  console.log("Server listening on");
});