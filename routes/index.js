const express = require('express');
const cryptoService = require('../services/crypto');

const router = express.Router();


router.get('/crypto/available', cryptoService.getAllCurrencies);

router.get('/crypto/symbol', cryptoService.getBySymbol);

router.post('/crypto/subscribe', cryptoService.subscribe);

router.post('/crypto/unsubscribe', cryptoService.unsubscribe);

router.use((req, res, next) => {
  if (!req.route) {
    res.send('not found');
  }
  next();
});

module.exports = router;
