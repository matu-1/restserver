const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

let rolesValidos = { values: ['USER_ROLE', 'ADMIN_ROLE'], message: '{VALUE} no es un rol valido' };
let hashpassword = (val) => bcrypt.hashSync(val, 10);
const Schema = mongoose.Schema;

let usuarioShema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria'],
    set: hashpassword
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos,
  },
  google: {
    type: Boolean,
    default: false,
  },
  estado:{
    type: Boolean,
    default: true
  }
});

usuarioShema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password ;
  return userObject;
}
usuarioShema.plugin(uniqueValidator, { message: 'El {PATH} debe de ser unico'});

module.exports = mongoose.model('usuario', usuarioShema);