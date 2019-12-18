const scheduler = require('node-schedule');
const cryptoServices = require('./crypto');

async function startShceduler() {
  const rule = new scheduler.RecurrenceRule();

  rule.second = new scheduler.Range(0, 59, 5);

  scheduler.scheduleJob(rule, cryptoServices.fetchCryptoCurrencyData);
}

module.exports = startShceduler;
