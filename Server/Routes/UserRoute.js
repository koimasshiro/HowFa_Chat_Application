const express = require('express');
const { deleteUser, getAllUsers, getUser, updateUser, searchUsers } = require('../Controllers/UserController.js');
const { protect } = require('../Middlewares/AuthMiddleware.js');

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser)
router.delete("/:id", deleteUser)
router.get('/', getAllUsers);
router.get('/', searchUsers)


module.exports = router;