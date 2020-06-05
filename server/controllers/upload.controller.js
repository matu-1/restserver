const Usuario = require('../models/usuario.model');
const Producto = require('../models/producto.model');
const path = require('path');
const fs = require('fs');

let upload = (req, res) => {
  const { tipo, id} = req.params;
  let tiposValidos = ['productos', 'usuarios'];
  if(tiposValidos.indexOf(tipo) < 0) 
    return res.status(400).json({ 
      ok: false, 
      err: { message: 'Los tipos permitidos son: ' + tiposValidos.join(', ') } 
    });

  if(!req.files)
    return res.status(400).json({ ok: false, err: { message: 'No se ha seleccionado ningun archivo' } });
  let file = req.files.archivo;
  let nameExt = file.name.split('.');
  let extension = nameExt[nameExt.length - 1];
  
  let extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'];
  if(extensionesPermitidas.indexOf(extension) < 0) 
    return res.status(400).json({ 
      ok: false,
      err: { 
        message: 'Las extensiones permitidas son: ' + extensionesPermitidas.join(', '),
        ext: extension, 
      }
    });

  let nombreArchivo = `${id}-${new Date().getTime()}.${extension}`;
  file.mv(`uploads/${tipo}/${ nombreArchivo }`, (err) => {
    if(err) return res.status(500).json({ ok: false, err})
    if(tipo == 'usuarios') imagenUsuario(id, res, nombreArchivo);
    else imagenProducto(id, res, nombreArchivo);
  });

};  

let imagenUsuario = (id, res, archivo) => {
  Usuario.findByIdAndUpdate(id, {img: archivo}, (err, usuario) => {
    if(err) {
      deleteImage('usuario', archivo); 
      return res.status(500).json({ ok: false, err})
    }
    if(!usuario){  // esto nunca se va a llamar ya q el update te pasa el usuario antiguo xq no le pusimos {new : true}
      deleteImage('usuario', archivo); 
      return res.status(400).json({ ok: false, err: { message: 'El usuario no existe' } });
    }
    deleteImage('usuarios', usuario.img);
    usuario.img = archivo;
    res.json({ ok: true, usuario, message: 'Se subio correctamente el archivo' });
  });
}

let imagenProducto = (id, res, archivo) => {
  Producto.findById(id, (err, producto) => {
    if(err) {
      deleteImage('productos', archivo); 
      return res.status(500).json({ ok: false, err})
    }
    if(!producto){  // esto nunca se va a llamar ya q el update te pasa el usuario antiguo xq no le pusimos {new : true}
      deleteImage('productos', archivo); 
      return res.status(400).json({ ok: false, err: { message: 'El producto no existe' } });
    }
    deleteImage('productos', producto.img);
    producto.img = archivo;
    producto.save((err, productod) => {
      res.json({ ok: true, producto, message: 'Se subio correctamente el archivo' });
    });
  });
}

let deleteImage = (tipo, img) => {
  let rutaImg = path.resolve(__dirname, `../../uploads`, tipo, img || '-');  // le puse un "-" xq el path existe hasta el tipo; otra forma es ponerlo todo en un solo parametro
  if(fs.existsSync(rutaImg)) fs.unlinkSync(rutaImg);
}


let getImage = (req, res) => {
  let { tipo, imagen } = req.params;
  let rutaImg = path.resolve(__dirname, `../../uploads/${tipo}/${imagen}`);
  let pathNoImg = path.resolve(__dirname, `../assets/no-image.jpg`);
  if(!fs.existsSync(rutaImg)) res.sendFile(pathNoImg);
  else res.sendFile(rutaImg);
}

module.exports = {
  upload,
  getImage
}