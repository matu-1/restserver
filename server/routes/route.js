const { Router } = require('express');
const router = Router();
const { verificarToken, verificarRolAdmin } = require('../middlewares/autenticacion');
const { getAll, getById, create, update, destroy, search } = require('../controllers/producto.controller');

router.get('/producto', verificarToken, getAll); // mostrar el documento de usuario y categoria y paginado
router.get('/producto/:id', verificarToken, getById);   
router.get('/producto/search/:termino', verificarToken, search);   
router.post('/producto', verificarToken, create);
router.put('/producto/:id', verificarToken, update);
router.delete('/producto/:id', verificarToken, destroy);

module.exports = router;