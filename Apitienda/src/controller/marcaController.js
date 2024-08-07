const db = require("../db/models");
const model = require("../db/models/generadomarcas")(db.sequelize, db.Sequelize);

// Obtener todas las marcas
module.exports.GetMarcas = async () => {
    const response = await model.findAll();
    return response;
}

// Crear una nueva marca
module.exports.CreateMarca = async(data) => {
    const response = await db.Generadomarcas.create(data);
    return response;
}

// Eliminar una marca por ID
module.exports.DeleteMarca = async(id) => {
    const response = await db.Generadomarcas.destroy({
        where: { id }
    });
    return response;
}

// Actualizar una marca por ID
module.exports.UpdateMarca = async(id, data) => {
    const response = await db.Generadomarcas.update(
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
