const normalizePhone = (phone) => {
  if (!phone.startsWith('55')) {
    return `55${phone}`;
  }
  return phone;
};

module.exports = { normalizePhone };
