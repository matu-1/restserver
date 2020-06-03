const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./config/config');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers/usuario.controller'));

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