const express = require('express');
const barangController = require('../controllers/BarangControllers');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/tambah', verifyToken, barangController.tambahBarang);
router.get('/', barangController.getBarang);
router.put('/update/:id', verifyToken, barangController.updateBarang);
router.delete('/hapus/:id', verifyToken, barangController.hapusBarang);

module.exports = router;
