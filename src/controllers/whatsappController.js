const whatsappApi = require('../services/whatsappApi');

const sendMessage = async (req, res) => {
  try {
    const { to } = req.body;

    const response = await whatsappApi.post('/', {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: 'natal',
        language: { code: 'pt_BR' },
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
};

module.exports = { sendMessage };
