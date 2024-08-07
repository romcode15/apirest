'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class generadoproducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  generadoproducto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'id'
      },
      allowNull: true
    },
    marcaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Marcas',
        key: 'id'
      },
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'generadoproducto',
  });
  return generadoproducto;
};
