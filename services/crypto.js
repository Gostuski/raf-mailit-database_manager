const axios = require('axios');
const Subscription = require('../models/crypto/subscription');
const Currency = require('../models/crypto/currency');

async function storeData(currencyData) {
  currencyData.forEach((data) => {
    const query = { symbol: data.symbol };
    Currency.findOneAndUpdate(query, data, { upsert: true, new: true }).exec();
  });
  console.log(currencyData);
}

async function fetchCryptoCurrencyData() {
  const currencies = await axios.get('http://api.coinlayer.com/api/list?access_key=2d80ec7fbaaf5d2a710601c7b1d51853');
  const subscriptions = await Subscription.find({});
  const prices = await axios.get('http://api.coinlayer.com/api/live?access_key=2d80ec7fbaaf5d2a710601c7b1d51853');

  const symbols = subscriptions.map((sub) => sub.symbol);

  const currencyData = [];

  symbols.forEach((symbol) => {
    const currency = { ...currencies.data.crypto[symbol], price: prices.data.rates[symbol] };
    currencyData.push(currency);
  });

  storeData(currencyData);
}


async function getAllCurrencies(req, res) {
  const response = await axios.get('http://api.coinlayer.com/api/list?access_key=2d80ec7fbaaf5d2a710601c7b1d51853');

  if (response.data.success === true) {
    const currencies = Object.values(response.data.crypto);
    res.send(currencies);
    // return currencies;
  } else {
    throw new Error(response.data.error);
  }
  // const currencies = Object.values(response.data.crypto);
  // res.send(currencies);
  // return currencies;
}

async function getBySymbol(req, res) {
  const { symbol } = req.query;
  if (!symbol) {
    res.send({ message: 'Request must contain a symbol in URL query. e.g. : (...crypto/symbol/?symbol=BTC)' });
    return;
  }
  Currency.findOne({ symbol }, (err, doc) => {
    if (err) res.send({ message: err });
    else res.send(doc);
    console.log(doc.price.numberDecimal);
  });
}

async function subscribe(req, res) {
  const { currency } = req.body;

  if (!currency) {
    res.send({ message: 'Must send body with currency symbol.' });
    return;
  }

  Subscription.findOne({ symbol: currency }, (err, entry) => {
    if (err) res.send({ message: err });
    if (!entry) {
      const newSubscription = new Subscription({ symbol: currency });
      newSubscription.save()
        .then(() => res.send({ message: 'Subscription registered.' }))
        .catch((error) => res.send({ message: error }));
    } else {
      Subscription.updateOne({ symbol: currency }, { $inc: { subscriptions: 1 } }).exec();
      res.send({ message: 'Subscription registered.' });
    }
  });
}

async function unsubscribe(req, res) {
  const { currency } = req.body;

  if (!currency) {
    res.send({ message: 'Must send body with currency symbol.' });
    return;
  }

  Subscription.findOneAndUpdate({ symbol: currency }, { $inc: { subscriptions: -1 } },
    { new: true }, (err, doc) => {
      if (err) return;
      if (!doc.subscriptions) {
        Subscription.findOneAndRemove({ symbol: currency }).exec();
        Currency.findOneAndRemove({ symbol: currency }).exec();
      }
      res.send(doc);
    });
}

module.exports = {
  getAllCurrencies,
  getBySymbol,
  subscribe,
  unsubscribe,
  fetchCryptoCurrencyData,
};
