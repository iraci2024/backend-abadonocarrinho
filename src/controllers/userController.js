const magazordApi = require('../services/magazordApi');

const normalizePhoneNumber = (phone) => {
  // Remove quaisquer caracteres que não sejam dígitos
  const digitsOnly = phone.replace(/\D/g, '');
  // Adiciona o código do país "55" caso não esteja presente
  if (!digitsOnly.startsWith('55')) {
    return `55${digitsOnly}`;
  }
  return digitsOnly;
};

const getAllUsers = async (req, res) => {
  try {
    let allUsers = [];
    let currentPage = 1; // Começa na primeira página
    let totalPages = 1; // Inicializado com 1, será atualizado após a primeira requisição

    do {
      const response = await magazordApi.get('/pessoa', {
        params: {
          limit: 100, // Limite máximo de registros por página
          page: currentPage, // Página atual
          listaContatos: 1, // Traz os contatos das pessoas
        },
      });

      // Atualiza o total de páginas baseado na primeira resposta
      if (response.data.data.total_pages) {
        totalPages = response.data.data.total_pages;
      }

      // Adiciona os usuários da página atual à lista geral
      const users = response.data.data.items.map((user) => ({
        id: user.id,
        nome: user.nome || "N/A",
        email: user.email || "N/A",
        contato_principal: user.pessoaContato?.[0]?.contato
          ? normalizePhoneNumber(user.pessoaContato[0].contato)
          : "N/A", // Normaliza o contato principal
      }));

      allUsers = [...allUsers, ...users];
      currentPage++; // Avança para a próxima página
    } while (currentPage <= totalPages);

    // Remove duplicados, caso existam
    const uniqueUsers = Array.from(new Set(allUsers.map((user) => JSON.stringify(user)))).map((user) =>
      JSON.parse(user)
    );

    res.json({ status: 'success', data: uniqueUsers });
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error.message);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

module.exports = { getAllUsers };
