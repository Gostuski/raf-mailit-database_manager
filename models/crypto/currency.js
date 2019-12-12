const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name_full: {
    type: String,
    required: true,
  },
  max_supply: {
    type: Number,
    required: true,
  },
  icon_url: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});
const currency = mongoose.model('currency', CurrencySchema, 'currencies');

module.exports = currency;
