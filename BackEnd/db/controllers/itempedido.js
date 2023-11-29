const express = require('express');
const router = express.Router();
const db = require('../../db/models');

// Create a new ItemPedido
router.post('/itempedido', async (req, res) => {
  try {
    console.log(req.body);
    const newItemPedido = await db.ItemPedido.create(req.body);
    res.status(201).json(newItemPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all ItemPedidos
router.get('/itempedido', async (req, res) => {
  try {
    const itemPedidos = await db.ItemPedido.findAll();

    if (itemPedidos && itemPedidos.length > 0) {
      res.json(itemPedidos);
    } else {
      res.status(404).send('Nenhum item de pedido encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ItemPedido by ID
router.get('/itempedido/:id', async (req, res) => {
  try {
    const itemPedido = await db.ItemPedido.findByPk(req.params.id);

    if (itemPedido) {
      res.json(itemPedido);
    } else {
      res.status(404).send('Item de pedido não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update ItemPedido
router.put('/itempedido/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const itemPedidoExistente = await db.ItemPedido.findByPk(id);

    if (!itemPedidoExistente) {
      return res.status(404).send('Item de pedido não encontrado');
    }

    const updatedItemPedido = await itemPedidoExistente.update(req.body);
    res.json(updatedItemPedido);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete ItemPedido
router.delete('/itempedido/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await db.ItemPedido.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send('Item de pedido deletado');
    } else {
      res.status(404).send('Item de pedido não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
