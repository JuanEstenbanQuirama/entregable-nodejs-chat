const { Router } = require("express");
const { createMessage} = require("../controllers/messages.controllers");
const { messageSendValidator } = require("../validators/messages.validators");



const router = Router();

router.post("/messages", messageSendValidator, createMessage);

module.exports = router;
