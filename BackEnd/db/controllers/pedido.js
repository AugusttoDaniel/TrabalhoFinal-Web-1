const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/pedido/pendentes', async (req, res) => {
  try {
    const pedidosPendentes = await db.Pedido.findAll({
      where: {
        Status: "pendente"
      },
      include: [
        {
          model: db.ItemPedido,
          as: 'itensPedido'
        },
        {
          model: db.Cliente,
          as: 'cliente',
          attributes: ['Nome', 'Telefone']
        }
      ]
    });

    if (pedidosPendentes && pedidosPendentes.length > 0) {
      res.json(pedidosPendentes);
    } else {
      res.status(404).send('Nenhum pedido pendente encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Create a new Pedido
router.post('/pedido', async (req, res) => {
  try {
    const newPedido = await db.Pedido.create(req.body);
    res.status(201).json(newPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Pedidos
router.get('/pedido', async (req, res) => {
  try {
    const pedidos = await db.Pedido.findAll();

    if (pedidos && pedidos.length > 0) {
      res.json(pedidos);
    } else {
      res.status(404).send('Nenhum pedido encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Pedido by ID
router.get('/pedido/:id', async (req, res) => {
  try {
    const pedido = await db.Pedido.findByPk(req.params.id);

    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).send('Pedido não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Pedido
router.put('/pedido/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pedidoExistente = await db.Pedido.findByPk(id);

    if (!pedidoExistente) {
      return res.status(404).send('Pedido não encontrado');
    }

    const updatedPedido = await pedidoExistente.update(req.body);
    res.json(updatedPedido);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Pedido
router.delete('/pedido/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await db.Pedido.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send('Pedido deletado');
    } else {
      res.status(404).send('Pedido não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

