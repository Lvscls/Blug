const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getUserById);

router.post('/current-user', userController.getCurrentUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
