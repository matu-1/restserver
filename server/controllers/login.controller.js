const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const router = Router();


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  Usuario.findOne({email}, (err, usuario) => {
    if(err) return res.status(400).json({ ok: false, err});
    if(!usuario) return res.status(400).json({ ok: false, err: { message: 'El email es incorrecto'}});
    if(!bcrypt.compareSync(password, usuario.password)) {
      res.status(400).json({ ok: false, err: { message: 'La contraseña es incorrecto'}});
    }else{
      let token = jwt.sign({ usuario }, process.env.SEED, {expiresIn: process.env.VENCIMIENTO_TOKEN });
      res.json({ ok: true, usuario, token });
    }
  });
});

module.exports = router;