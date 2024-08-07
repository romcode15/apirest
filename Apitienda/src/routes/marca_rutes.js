const express = require("express");
const router = express.Router();
const marcaController = require("../controller/marcaController");

// Ver todas las marcas /marcas
router.get('/', async (req, res) => {
    try {
        const marcas = await marcaController.GetMarcas();
        res.status(200).send(marcas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insertar una marca; /marcas
router.post('/', async (req, res) => {
    try {
        const nuevaMarca = await marcaController.CreateMarca(req.body);
        res.status(201).send(nuevaMarca);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una marca; /marcas/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eliminar = await marcaController.DeleteMarca(id);
        if (eliminar) {
            return res.status(200).send('Marca eliminada con éxito');
        } else {
            throw new Error('Marca no encontrada');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una marca; /marcas/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion } = req.body;

        const resultado = await marcaController.UpdateMarca(id, { nombre, descripcion });
        if (resultado[0] === 0) {
            return res.status(404).send({ message: 'Marca no encontrada' });
        }
        res.status(200).send({ message: 'Marca actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
