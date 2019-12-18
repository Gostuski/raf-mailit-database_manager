const express = require('express');
const cryptoService = require('../services/crypto');

const router = express.Router();


router.get('/crypto/available', cryptoService.getAllCurrencies);

router.get('/crypto/symbol', cryptoService.getBySymbol);

router.post('/crypto/subscribe', cryptoService.subscribe);

router.post('/crypto/unsubscribe', cryptoService.unsubscribe);

module.exports = router;
