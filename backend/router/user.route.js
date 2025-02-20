const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router
    .post('/register', userController.register)
    .get('/login', userController.login)
    .get('/user', authMiddleware, userController.user)
    .get('/logout', authMiddleware, userController.logout)
    .delete('/delete', authMiddleware, userController.deleteUser);


module.exports = router;