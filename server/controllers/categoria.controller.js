const { Router } = require('express');
const router = Router();
const Categoria = require('../models/categoria.model');
const pick = require('../config/utils').pick;
const { verificarToken, verificarRolAdmin } = require('../middlewares/autenticacion');


router.get('/categoria', verificarToken, (req, res) => {
  Categoria.find({})
  .populate('usuario', 'nombre email')
  .sort('descripcion')
    .exec((err, categorias) => {
      if(err) return res.status(500).json({ ok: false, err });
      res.json({ ok: true, categorias });
    });
});

router.get('/categoria/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  Categoria.findById(id, (err, categoria) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(!categoria) 
      return res.status(400).json({ ok: false, err: { message: 'No existe la categoria'}})
    res.json({ ok: true, categoria });
  });
});

router.post('/categoria', [verificarToken, verificarRolAdmin], (req, res) => {
  let body = pick(req.body, ['descripcion']);
  body.usuario = req.usuario._id;
  let categoria = new Categoria(body);
  categoria.save((err, categoria) => {
    if(err) return res.status(500).json({ ok: false, err });
    res.json({ ok: true, categoria });
  })
});

router.put('/categoria/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  let body = pick(req.body, ['descripcion']);
  Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, categoria) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(!categoria) 
      return res.status(400).json({ ok: false, err: { message: 'No existe la categoria'}})
    res.json({ ok: true, categoria });
  });
});

router.delete('/categoria/:id', [verificarToken, verificarRolAdmin], (req, res) => {
  let id = req.params.id;
  Categoria.findByIdAndRemove(id, (err, categoria ) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(!categoria) 
      return res.status(400).json({ ok: false, err: { message: 'No existe la categoria'}})
    res.json({ ok: true, categoria });
  });
});

module.exports = router;