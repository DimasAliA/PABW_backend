const express = require('express');
const { tambahItemKeKeranjang } = require('../controllers/KeranjangControllers');
const { buatTransaksi } = require('../controllers/TransaksiControllers');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/tambah-ke-keranjang', verifyToken, tambahItemKeKeranjang);
router.post('/checkout', verifyToken, buatTransaksi);

module.exports = router;
