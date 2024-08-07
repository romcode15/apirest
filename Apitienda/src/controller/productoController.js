const db = require("../db/models");
const model = require("../db/models/generadoproductos")(db.sequelize, db.Sequelize);

// Obtener todos los productos
module.exports.GetProductos = async () => {
    const response = await model.findAll();
    return response;
}

// Crear un nuevo producto
module.exports.CreateProducto = async(data) => {
    const response = await db.Generadoproductos.create(data);
    return response;
}

// Eliminar un producto por ID
module.exports.DeleteProducto = async(id) => {
    const response = await db.Generadoproductos.destroy({
        where: { id }
    });
    return response;
}

// Actualizar un producto por ID
module.exports.UpdateProducto = async(id, data) => {
    const response = await db.Generadoproductos.update(
        {
            nombre: data.nombre,
            precio: data.precio,
            descripcion: data.descripcion,
            categoria: data.categoria,
            stock: data.stock
        },
        {
            where: { id }
        }
    );
    return response;
};
