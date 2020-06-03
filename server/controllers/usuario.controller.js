const { Router } = require('express');
const router = Router();
const Usuario = require('../models/usuario.model');
const pick = require('../config/utils').pick;
const { verificarToken, verificarRolAdmin } = require('../middlewares/autenticacion');

router.get('/usuario', verificarToken, (req, res) => {
  let pagina = req.query.pagina || 1;
  pagina = Number(pagina);
  let cantidad = req.query.cantidad || 5;
  cantidad = Number(cantidad);

  Usuario.find({'estado': true}, 'nombre email role estado img')
    .skip((pagina - 1) * cantidad)   ///salta los primeros 5 registros
    .limit(cantidad)
    .exec((err, usuarios) => {
      if(err) return res.status(400).json({ ok: false, err});
      res.json({ ok: true, usuarios });
    });
});

router.post('/usuario', [verificarToken, verificarRolAdmin], (req, res) => {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    role: body.role,
  });
  usuario.save((err, usuarioDB) => {
    if(err) return res.status(400).json({ ok: false, err});
    res.json({ ok: true, usuario: usuarioDB});
  });
});

router.put('/usuario/:id', [verificarToken, verificarRolAdmin], (req, res) => {
  let id = req.params.id;
  let body = pick(req.body, ['nombre', 'email', 'img', 'role']);
  Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
    if(err) return res.status(400).json({ ok: false, err});
    if(!usuarioDB) 
      return res.json({ ok: true, err: { message: 'Usuario no encontrado'} });
    res.json({ ok: true, usuario: usuarioDB });
  });
});

router.delete('/usuario/:id', [verificarToken, verificarRolAdmin], (req, res) => {
  let id = req.params.id;
  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  //   if(err) return res.status(400).json({ ok: false, err});
  //   if(!usuarioBorrado) 
  //     return res.json({ ok: true, err: { message: 'Usuario no encontrado'} });
  //   res.json({ ok: true, usuario: usuarioBorrado })
  // });
  Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioBorrado) => {
    if(err) return res.status(400).json({ ok: false, err});
    if(!usuarioBorrado) 
      return res.json({ ok: true, err: { message: 'Usuario no encontrado'} });
    res.json({ ok: true, usuario: usuarioBorrado })
  });
});

module.exports = router;