require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Definición del modelo de Marca
const Marca = sequelize.define('Marca', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Definición del modelo de Producto
const Producto = sequelize.define('Producto', {
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
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Definición del modelo de Categoria
const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Relaciones entre modelos
Producto.belongsTo(Marca, { foreignKey: 'marcaId' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Marca.hasMany(Producto, { foreignKey: 'marcaId' });
Categoria.hasMany(Producto, { foreignKey: 'categoriaId' });

// Sincronización de los modelos con la base de datos
Marca.sync();
Producto.sync();
Categoria.sync();

// Exportación de los modelos
module.exports = {
  Marca,
  Producto,
  Categoria
};

// Probar conexión (opcional)
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();
