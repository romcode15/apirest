// Punto de entrada
const express = require('express');
require("dotenv").config();
const port = process.env.APP_PORT || 3000;
const app = express();
const router = require('./routes');
const path = require('path');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
require('./auth/auth');

app.use(express.json());

// Middleware del token
const fldsmdfr = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Acceso denegado, sin Token.' });
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Token malformado.' });
    }
  
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: 'Token Invalido o expirado.' });
      }
      req.user = user;
      next();
    });
};

// Configuración de express-session
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

// Ruta para la página de home
app.get('/home', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('No autenticado');
  }
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Ruta para obtener los datos del usuario autenticado
app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  res.json({
    displayName: req.user.displayName,
    email: req.user.email,
    picture: req.user.picture // Incluye la imagen
  });
});

// Ruta para manejar el logout
app.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/login');
  });
});

// Rutas de autenticación con Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Redirige a /home después de autenticarse con éxito.
    res.redirect('/home');
  }
);

app.get('/auth/failure', (req, res) => {
  res.send('Oh, ocurrió un error...');
});

// Rutas protegidas y no protegidas
app.use('/categorias', fldsmdfr, router.CategoriaRoutes);
app.use('/marcas', fldsmdfr, router.MarcaRoutes);
app.use('/productos', fldsmdfr, router.ProductoRoutes);
app.use('/auth', router.UserRutes);

// Rutas de vistas
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Server
app.listen(port, () => {
  console.log(`Server online at port ${port}: http://localhost:${port}`);
});
