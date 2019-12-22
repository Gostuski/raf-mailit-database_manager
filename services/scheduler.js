const scheduler = require('node-schedule');
const cryptoServices = require('./crypto');

async function startShceduler() {
  const rule = new scheduler.RecurrenceRule();

  rule.minute = new scheduler.Range(0, 59, 10);

  scheduler.scheduleJob(rule, cryptoServices.fetchCryptoCurrencyData);
}

module.exports = startShceduler;
