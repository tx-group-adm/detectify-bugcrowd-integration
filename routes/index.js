const detectifyController = require('../controllers/detectifyController');

module.exports = (server) => {
  server.post('/detectify/receive-webhook', (req, res) => detectifyController.receiveWebhook(req, res));

  server.get('/', (req, res) => detectifyController.getBounties(req, res));
};
