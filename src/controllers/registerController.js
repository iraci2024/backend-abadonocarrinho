const pool = require('../services/database');
const normalizePhoneNumber = require('../utils/phoneUtils').normalizePhone;

// Função para capturar IP real
const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  return forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
};

// Função para verificar se o IP já está registrado
const isIpRegistered = async (ip) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE ip_address = ?', [ip]);
    console.log(`Consulta ao banco de dados realizada para verificar o IP: ${ip}`);
    return rows.length > 0;
  } catch (error) {
    console.error('Erro ao verificar IP no banco de dados:', error.message);
    throw error;
  }
};

// Função para salvar usuário no banco de dados
const saveUserToDatabase = async (ip, data) => {
  try {
    const { nome, telefone } = data;
    await pool.query(
      'INSERT INTO users (ip_address, nome, telefone) VALUES (?, ?, ?, ?, ?)',
      [ip, nome, telefone]
    );
    console.log(`Usuário salvo no banco de dados com sucesso: Nome=${nome}, IP=${ip}`);
  } catch (error) {
    console.error('Erro ao salvar usuário no banco de dados:', error.message);
    throw error;
  }
};

const registerUser = async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    // Validações básicas
    if (!nome || !telefone) {
      console.warn('Dados incompletos fornecidos pelo cliente.');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Captura o IP do cliente
    const ip = getClientIp(req);
    console.log(`IP do cliente capturado: ${ip}`);

    // Verifica se o IP já está registrado
    const ipExists = await isIpRegistered(ip);
    if (ipExists) {
      console.warn(`Tentativa de registro duplicado para o IP: ${ip}`);
      return res.status(400).json({ message: 'Usuário já registrado com este IP.' });
    }

    // Salva os dados do usuário no banco de dados
    await saveUserToDatabase(ip, { nome, telefone });

    console.log(`Registro completo para o usuário: Nome=${nome}, IP=${ip}`);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Erro ao buscar registros:', error.message);
    res.status(500).json({ message: 'Erro ao buscar registros.' });
  }
};

module.exports = { registerUser, getAllRegistrations };
