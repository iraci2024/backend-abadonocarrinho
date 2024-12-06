const moment = require('moment');

const getDateRange = () => {
  const end = moment();
  const start = end.clone().subtract(23, 'days');
  return { start: start.format('YYYY-MM-DD HH:mm:ss'), end: end.format('YYYY-MM-DD HH:mm:ss') };
};

module.exports = { getDateRange };
