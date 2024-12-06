const magazordApi = require('../services/magazordApi');
const whatsappApi = require('../services/whatsappApi');

const checkMagazordStatus = async () => {
  try {
    await magazordApi.get('/carrinho');
    return 'online';
  } catch (error) {
    return 'offline';
  }
};

const checkWhatsAppStatus = async () => {
  try {
    await whatsappApi.post('/');
    return 'online';
  } catch (error) {
    return 'offline';
  }
};

module.exports = {
  checkMagazordStatus,
  checkWhatsAppStatus,
};
