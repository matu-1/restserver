const Producto = require('../models/producto.model');
const pick = require('../config/utils').pick;

let getAll = (req, res) => {
  let pagina = req.query.pagina || 1; pagina = Number(pagina);
  let cantidad = req.query.cantidad || 5; cantidad = Number(cantidad);

  Producto.find({disponible: true})
    .skip((pagina - 1) * cantidad)
    .limit(cantidad)
    .populate('categoria')
    .populate('usuario', 'nombre email')
    .exec((err, productos) => {
      if(err) return res.status(500).json({ ok: false, err });
      res.json({ ok: true, productos });
    });
}

let getById = (req, res) => {
  let id = req.params.id;
  Producto.findById(id)
    .populate('categoria')
    .populate('usuario', 'nombre email')
    .exec((err, producto) => {
      if(err) return res.status(500).json({ ok: false, err });
      if(!producto) 
        return res.status(400).json({ ok: false, err: { message: 'No existe el producto'}})
      res.json({ ok: true, producto });
    });
}

let search = (req, res) => {
  let query = req.params.termino;
  let regexp = new RegExp(query, 'i');
  Producto.find({disponible: true, nombre: regexp})
    .exec((err, productos) => {
      if(err) return res.status(500).json({ ok: false, err });
      res.json({ ok: true, productos });
    });
};

let create = (req, res) => {
  let body = pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);
  body.usuario = req.usuario._id;
  let producto = new Producto(body);
  producto.save((err, producto) => {
    if(err) return res.status(500).json({ ok: false, err });
    res.json({ ok: true, producto });
  });
}

let update = (req, res) => {
  let body = pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);
  let id = req.params.id;
  Producto.findByIdAndUpdate(id, body, {new: true}, (err, producto) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(!producto) 
      return res.status(400).json({ ok: false, err: { message: 'No existe el producto'}})
    res.json({ ok: true, producto });
  });
};

let destroy = (req, res) => {
  let id = req.params.id;
  Producto.findByIdAndUpdate(id, {disponible: false}, {new: true}, (err, producto) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(!producto) 
      return res.status(400).json({ ok: false, err: { message: 'No existe el producto'}})
    res.json({ ok: true, producto });
  });
};


module.exports = {
  getAll, create, update, getById, destroy, search
}