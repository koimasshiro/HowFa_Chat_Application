const express = require('express');
const { deleteUser, getAllUsers, getUser, updateUser } = require('../Controllers/UserController.js');

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', updateUser)
router.delete("/:id", deleteUser)
router.get('/', getAllUsers)

module.exports = router;