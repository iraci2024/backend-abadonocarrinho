const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'magazord',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
})();

module.exports = pool;
