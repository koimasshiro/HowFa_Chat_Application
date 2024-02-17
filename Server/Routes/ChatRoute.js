const express = require('express');
const { createChat, userChats, findChat } = require('../Controllers/ChatController');


const router = express.Router();

router.post("/createChat", createChat);
router.get("/:userId", userChats);
router.get("/:find/:firstId/:secondId", findChat);

module.exports = router;