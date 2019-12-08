const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');



//register
router.post('/register', userController.user_register);


//login
router.post('/login', userController.user_login);


//user delete
router.delete('/:user_id', userController.user_delete);









module.exports = router;
