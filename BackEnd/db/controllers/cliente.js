const db = require("../../db/models/index");
const express = require("express");
const router = express.Router();

// Criar um novo cliente
router.post("/pedido", async (req, res) => {
  try {
    const { ClienteID, PrecoTotal, Status, DataPedido } = req.body;

    console.log(ClienteID);
    if (!ClienteID) {
      return res.status(400).json({ error: "Cliente não especificado." });
    }

    // Aqui você pode adicionar outras validações, se necessário

    // Crie o pedido somente se o ClienteId estiver presente
    const novoPedido = await db.Pedido.create({
      ClienteID,
      PrecoTotal,
      Status,
      DataPedido,
    });

    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Obter todos os clientes
router.get("/cliente", async (req, res) => {
  try {
    const clientes = await db.Cliente.findAll();

    // Verifica se há clientes
    if (clientes && clientes.length > 0) {
      res.json(clientes);
    } else {
      // Se não houver clientes, envia uma mensagem indicando isso
      res.status(404).send("Nenhum cliente encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um cliente pelo ID
router.get("/cliente/:id", async (req, res) => {
  try {
    const cliente = await db.Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).send("Cliente não encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/cliente/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar se o cliente existe
    const clienteExistente = await db.Cliente.findByPk(id);
    if (!clienteExistente) {
      return res.status(404).send("Cliente não encontrado");
    }

    // Dados para atualização
    const dadosAtualizacao = {
      Nome: req.body.Nome,
      Email: req.body.Email,
      Endereco: req.body.Endereco,
      Telefone: req.body.Telefone
    };

    // Atualizar o cliente
    await db.Cliente.update(dadosAtualizacao, { where: { id } });

    // Buscar o cliente atualizado
    const updatedCliente = await db.Cliente.findByPk(id);
    res.status(200).json(updatedCliente);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um cliente pelo ID
router.delete("/cliente/:id", async (req, res) => {
  try {
    const deleted = await db.Cliente.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Cliente deletado");
    } else {
      res.status(404).send("Cliente não encontrado");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
