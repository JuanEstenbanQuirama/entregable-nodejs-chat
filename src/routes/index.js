const userRoutes = require('./user.routes');
const conversationsRoutes = require('./conversations.routes');
const messagesRoutes = require('./messages.routes');

const apiRoutes = (app) => {
    app.use(userRoutes);
    app.use(conversationsRoutes);
    app.use(messagesRoutes);

};

module.exports = apiRoutes;