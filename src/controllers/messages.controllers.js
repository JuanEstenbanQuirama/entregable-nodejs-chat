const { Conversations, Participants, Users, Messages } = require("../models");

const createMessage = async (req, res, next) => {
  try {
    const { content, senderId, conversationId } = req.body;
    // crear mensaje 
    const conversation = await Messages.create({ content, senderId, conversationId});
  
    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createMessage,
   
  };
  