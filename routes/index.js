const express = require('express');
const cryptoService = require('../services/crypto');

const router = express.Router();


router.get('/crypto', cryptoService.getAllCurrencies);

router.get('/crypto/symbol', cryptoService.getBySymbol);

router.post('/crypto/subscribe', cryptoService.subscribe);

module.exports = router;
