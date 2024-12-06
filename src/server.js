const app = require('./app');
const whatsappApi = require('./services/whatsappApi');

const PORT = 5000;

// const sendInitialMessage = async () => {
//   try {
//     const response = await whatsappApi.post('/', {
//       messaging_product: 'whatsapp',
//       to: '5547997321561',
//       type: 'template',
//       template: {
//         name: 'natal',
//         language: { code: 'pt_BR' },
//       },
//     });
//     console.log('Mensagem inicial enviada ao número: 5547997321561');
//   } catch (error) {
//     console.error('Erro ao enviar mensagem inicial:', error.message);
//   }
// };

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
