const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userController = require('../controllers/userControllers')
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/profile', verifyToken, userController.getUserProfile);
router.put('/profile', verifyToken, userController.updateUserProfile);

module.exports = router;
