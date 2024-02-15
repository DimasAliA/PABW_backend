const express = require('express');
const { buatTransaksi } = require('../controllers/TransaksiControllers');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/buat', verifyToken, buatTransaksi);

module.exports = router;
