const cryptoServices = require('../services/crypto');


async function getAllCurrencies(req, res, next) {
  try {
    const currencies = cryptoServices.getAllCurrencies();
    res.send(currencies);
  } catch (error) {
    next(error);
  }
}
