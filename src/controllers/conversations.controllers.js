const { Conversations, Participants, Users, Messages } = require("../models");

const createConversation = async (req, res, next) => {
  try {
    const { createdBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createdBy, type });
    //tomar el id de la conversacion creada y agregar a los participantes
    const { id } = conversation;
    //agregar a los participantes en la tabla pibote
    const participantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));

    participantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participantsArray);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getConversationForUser = async (req, res, next) => {
  try {
    console.log(req.params);
    const { userId } = req.params;
    const userConversations = await Participants.findAll({
      where: { userId },
      attributes: ["conversationId"],
    });
    const conversationIds = userConversations.map( 
      (conversation) => conversation.conversationId
    );
    const conversations = await Conversations.findAll({
      where: { id: conversationIds }, 
      include: [{ model: Messages }],
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

const getConversationById = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    // Consultar la tabla Conversations para obtener los detalles de la conversación, incluyendo sus participantes.
    const conversation = await Conversations.findOne({
      where: { id: conversationId },
      include: [
        {
          model: Participants,
          include: [{ model: Users, attributes: ["id", "username", "email"] }], // Incluir los detalles de los usuarios participantes.
        },
        {
          model: Messages,
          include: [{ model: Users, attributes: ["id", "username", "email"] }], // Incluir los detalles de los usuarios que enviaron los mensajes.
        },
      ],
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversación no encontrada." });
    }

    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  deleteConversation,
  getConversationForUser,
  getConversationById,
};
