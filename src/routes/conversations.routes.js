const { Router } = require("express");
const {
  createConversation,
  deleteConversation,
  getConversationForUser,
  getConversationById
} = require("../controllers/conversations.controllers");
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

router.post("/conversations", authenticate, createConversation);

router.delete("/conversations/:id", deleteConversation); // no funciona

router.get("/conversations/:userId", getConversationForUser); 

router.get('/conversation/:conversationId', getConversationById)




module.exports = router;
