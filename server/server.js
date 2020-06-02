const express = require('express');
const app = express();
require('./config/config');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/usuario', (req, res) => {
  res.json('hola mundo');
});

app.post('/usuario', (req, res) => {
  let body = req.body;
  if(body.id == undefined){
    res.status(400).json({ ok: false, mensaje: 'Necesita agregar el id'});
  }else {
    res.json({body});
  }
});

app.put('/usuario/:id', (req, res) => {
  let id = req.params.id;
  res.json({id});
});

app.delete('/usuario', (req, res) => {
  res.json('delete mundo');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando en el puerto', process.env.PORT);
});