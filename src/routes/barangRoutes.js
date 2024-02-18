const express = require('express');
const barangController = require('../controllers/BarangControllers');
const { verifyToken,verifyRole } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/tambah', verifyToken,verifyRole(['pengguna','penitip']),barangController.tambahBarang);
router.get('/', barangController.getBarang);
router.put('/update/:id', verifyToken,verifyRole(['admin']), barangController.updateBarang);
router.delete('/hapus/:id', verifyToken,verifyRole(['admin']), barangController.hapusBarang);

module.exports = router;
