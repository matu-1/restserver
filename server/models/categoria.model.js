const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Shema = mongoose.Schema;

const categoriaShema = new Shema({
  descripcion: {
    type: String,
    required: [true, 'La descripcion es necesaria'],
    unique: true,
  },
  usuario: {
    type: Shema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  }
});

// categoriaShema.path('usuario').ref('Usuario');
categoriaShema.plugin(uniqueValidator, { message: 'La {PATH} debe de ser unico'});

module.exports = mongoose.model('Categoria', categoriaShema);