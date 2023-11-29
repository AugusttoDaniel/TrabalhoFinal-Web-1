const express = require('express');
const router = express.Router();
const db = require('../../db/models');

// Create a new Produto
router.post('/produto', async (req, res) => {
  try {
    const newProduto = await db.Produto.create(req.body);
    res.status(201).json(newProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Produtos
router.get('/produto', async (req, res) => {
  try {
    const produtos = await db.Produto.findAll();

    if (produtos && produtos.length > 0) {
      res.json(produtos);
    } else {
      res.status(404).send('Nenhum produto encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Produto by ID
router.get('/produto/:id', async (req, res) => {
  try {
    const produto = await db.Produto.findByPk(req.params.id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//listar todos os produtos por categoria
router.get('/produto/categoria/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  
  try {
    // Ajuste conforme a estrutura do seu modelo e banco de dados
    const produtos = await db.Produto.findAll({
      where: { Categoria: categoria }
    });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update Produto
router.put('/produto/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produtoExistente = await db.Produto.findByPk(id);

    if (!produtoExistente) {
      return res.status(404).send('Produto não encontrado');
    }

    const updatedProduto = await produtoExistente.update(req.body);
    res.json(updatedProduto);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Produto
router.delete('/produto/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await db.Produto.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send('Produto deletado');
    } else {
      res.status(404).send('Produto não encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
