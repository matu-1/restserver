const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('./config/config');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ruta publica
app.use(express.static(path.resolve(__dirname, '../public')))

//rutas
app.use(require('./controllers/usuario.controller'));
app.use(require('./controllers/login.controller'))
app.use(require('./controllers/categoria.controller'))
app.use(require('./routes/route'));

mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(resp => console.log('BD corriendo'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log('Escuchando el puerto:', process.env.PORT);
});