const jwt = require('jsonwebtoken');

//verificar token
let verificarToken = (req, res, next) => {
  let token =  req.get('token');     // el get obtiene valores del headers
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if(err) return res.status(401).json({ ok: false, err: { message: 'Token no valido'}});
    req.usuario = decoded.usuario;
    next();
  });
};

let verificarRolAdmin = (req, res, next) => {
  let role = req.usuario.role;
  if(role != 'ADMIN_ROLE') 
    return res.status(401).json({ ok: false, err: { message: 'El usuario no es administrador'}});
  next()
}

module.exports = {
  verificarToken,
  verificarRolAdmin
}