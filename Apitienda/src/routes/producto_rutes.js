const express = require("express");
const router = express.Router();
const productoController = require("../controller/productoController");

// Ver todos los productos /productos
router.get('/', async (req, res) => {
    try {
        const productos = await productoController.GetProductos();
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insertar un producto; /productos
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await productoController.CreateProducto(req.body);
        res.status(201).send(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto; /productos/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eliminar = await productoController.DeleteProducto(id);
        if (eliminar) {
            return res.status(200).send('Producto eliminado con éxito');
        } else {
            throw new Error('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un producto; /productos/:id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, precio, descripcion, stock, categoriaId, marcaId } = req.body;

        const resultado = await productoController.UpdateProducto(id, { nombre, precio, descripcion, stock, categoriaId, marcaId });
        if (resultado[0] === 0) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        res.status(200).send({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
