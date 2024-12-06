const pool = require("../services/database");

// Salvar os dados de rastreamento no banco de dados
const saveTrackingData = async (data) => {
  const { ip, url, timestamp, event } = data;
  try {
    await pool.query(
      "INSERT INTO tracking (ip_address, url, timestamp, event) VALUES (?, ?, ?, ?)",
      [ip, url, timestamp, event]
    );
    console.log(`Rastreamento salvo: IP=${ip}, URL=${url}, Evento=${event}`);
  } catch (error) {
    console.error("Erro ao salvar rastreamento:", error.message);
  }
};

// Endpoint para receber dados do script
const trackEvent = async (req, res) => {
  try {
    const trackingData = req.body;

    // Verificar se os dados são válidos
    if (!trackingData.ip || !trackingData.url || !trackingData.timestamp) {
      return res.status(400).json({ message: "Dados de rastreamento inválidos." });
    }

    await saveTrackingData(trackingData);
    res.status(201).json({ message: "Rastreamento registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar rastreamento:", error.message);
    res.status(500).json({ message: "Erro ao registrar rastreamento." });
  }
};

const getAllTrackingData = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tracking');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Erro ao buscar dados de rastreamento:', error.message);
    res.status(500).json({ message: 'Erro ao buscar dados de rastreamento.' });
  }
};

module.exports = { trackEvent, getAllTrackingData };
