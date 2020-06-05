const { Router } = require('express');
const router = Router();
const { verificarToken, verificarRolAdmin, verificarTokenImg } = require('../middlewares/autenticacion');
const { getAll, getById, create, update, destroy, search } = require('../controllers/producto.controller');
const { upload, getImage } = require('../controllers/upload.controller');

router.get('/producto', verificarToken, getAll); // mostrar el documento de usuario y categoria y paginado
router.get('/producto/:id', verificarToken, getById);   
router.get('/producto/search/:termino', verificarToken, search);   
router.post('/producto', verificarToken, create);
router.put('/producto/:id', verificarToken, update);
router.delete('/producto/:id', verificarToken, destroy);

router.put('/upload/:tipo/:id', upload);
router.get('/imagen/:tipo/:imagen', verificarTokenImg, getImage);

module.exports = router;