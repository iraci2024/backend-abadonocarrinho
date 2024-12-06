const magazordApi = require('../services/magazordApi');
const { getDateRange } = require('../utils/dateUtils');

const getAbandonedCarts = async (req, res) => {
  try {
    const { start, end } = getDateRange();
    const carts = [];
    let page = 1;

    while (true) {
      const response = await magazordApi.get('/carrinho', {
        params: {
          dataAtualizacaoInicio: start,
          dataAtualizacaoFim: end,
          status: 2,
          limite: 100,
          pagina: page,
        },
      });

      carts.push(...response.data.data.items);

      if (!response.data.data.has_more) break;
      page++;
    }

    const detailedCarts = await Promise.all(
      carts.map(async (cart) => {
        const cartDetails = await magazordApi.get(`/carrinho/${cart.id}/itens`);
        return {
          id: cart.id,
          hash: cart.hash,
          status: cart.status,
          person: cartDetails.data.data.carrinho.pessoa,
          items: cartDetails.data.data.carrinho.itens.map((item) => ({
            productCode: item.codigo_produto,
            quantity: item.quantidade,
            imageUrl: item.midia_url,
            productUrl: item.url_pagina,
          })),
        };
      })
    );

    res.json({ status: 'success', data: detailedCarts });
  } catch (error) {
    console.error('Erro ao buscar carrinhos abandonados:', error.message);
    res.status(500).json({ message: 'Erro ao buscar carrinhos abandonados' });
  }
};

module.exports = { getAbandonedCarts };
