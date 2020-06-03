const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Usuario = require('../models/usuario.model');
const router = Router();


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  Usuario.findOne({email}, (err, usuario) => {
    if(err) return res.status(500).json({ ok: false, err});
    if(!usuario) return res.status(400).json({ ok: false, err: { message: 'El email es incorrecto'}});
    if(!bcrypt.compareSync(password, usuario.password)) {
      res.status(400).json({ ok: false, err: { message: 'La contraseña es incorrecto'}});
    }else{
      let token = jwt.sign({ usuario }, process.env.SEED, {expiresIn: process.env.VENCIMIENTO_TOKEN });
      res.json({ ok: true, usuario, token });
    }
  });
});

//confi google
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true,
    password: ';)'
  }
}

router.post('/google', async (req, res) => {
  let token = req.body.idtoken;
  let googleUser =  await verify(token)
    .catch(err => {
      return res.status(403)
        .json({ ok: false, err });
    })
  
  Usuario.findOne({ email: googleUser.email }, (err, usuario) => {
    if(err) return res.status(500).json({ ok: false, err });
    if(usuario){
      if(!usuario.google) return res.status(400).json({ ok: false, err: { message: 'Debe usar la autenticacion normal '} });
      let token = jwt.sign({ usuario }, process.env.SEED, {expiresIn: process.env.VENCIMIENTO_TOKEN });
      res.json({ ok: true, usuario, token });
    }else {
      let user = new Usuario(googleUser);
      user.save((err, usuario) => {
        if(err) return res.status(500).json({ ok: false, err });
        let token = jwt.sign({ usuario }, process.env.SEED, {expiresIn: process.env.VENCIMIENTO_TOKEN });
        res.json({ ok: true, usuario, token });
      });
    }
  });
});

module.exports = router;