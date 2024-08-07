const db = require("../db/models");
const model = require("../db/models/generadocategorias")(db.sequelize, db.Sequelize);

// Obtener todas las categorías
module.exports.GetCategorias = async () => {
    const response = await model.findAll();
    return response;
}

// Crear una nueva categoría
module.exports.CreateCategoria = async(data) => {
    const response = await db.Generadocategorias.create(data);
    return response;
}

// Eliminar una categoría por ID
module.exports.DeleteCategoria = async(id) => {
    const response = await db.Generadocategorias.destroy({
        where: { id }
    });
    return response;
}

// Actualizar una categoría por ID
module.exports.UpdateCategoria = async(id, data) => {
    const response = await db.Generadocategorias.update(
        {
            nombre: data.nombre,
            descripcion: data.descripcion
        },
        {
            where: { id }
        }
    );
    return response;
};
