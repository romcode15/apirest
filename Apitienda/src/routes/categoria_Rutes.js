const express = require("express");
const router = express.Router();
const categoriaController = require("../controller/categoriaController");

// Ver todas las categorías /categorias
router.get('/', async (req, res) => {
    try {
        const categorias = await categoriaController.GetCategorias();
        res.status(200).send(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insertar una categoría; /categorias
router.post('/', async (req, res) => {
    try {
        const nuevaCategoria = await categoriaController.CreateCategoria(req.body);
        res.status(201).send(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una categoría; /categorias/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eliminar = await categoriaController.DeleteCategoria(id);
        if (eliminar) {
            return res.status(200).send('Categoría eliminada con éxito');
        } else {
            throw new Error('Categoría no encontrada');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una categoría; /categorias/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion } = req.body;

        const resultado = await categoriaController.UpdateCategoria(id, { nombre, descripcion });
        if (resultado[0] === 0) {
            return res.status(404).send({ message: 'Categoría no encontrada' });
        }
        res.status(200).send({ message: 'Categoría actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
