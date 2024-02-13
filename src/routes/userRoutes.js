const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userController = require('../controllers/userControllers')

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
