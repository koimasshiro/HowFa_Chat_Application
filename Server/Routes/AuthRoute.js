const express = require('express');
const {protect} = require('../Middlewares/AuthMiddleware');
const { loginUser, registerUser, getAllUsers } = require('../Controllers/AuthController');

const router = express.Router();

router.post('/login', loginUser);
router.route('/register').post(registerUser).get(protect, getAllUsers);


module.exports = router;