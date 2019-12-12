const axios = require('axios');
const Subscription = require('../models/crypto/subscription');

async function getAllCurrencies(req, res) {
  axios
    .get('http://api.coinlayer.com/api/list?access_key=2d80ec7fbaaf5d2a710601c7b1d51853')
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      // console.log(error);
      res.send(error);
    });
}

async function getBySymbol(req, res) {
  axios
    .get('http://api.coinlayer.com/api/live?access_key=2d80ec7fbaaf5d2a710601c7b1d51853')
    .then((response) => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
    // console.log(error);
      res.send(error);
    });
}

async function subscribe(req, res) {
  Subscription.find({ symbol: req.body.symbol }, (err, entry) => {
    if (err) res.send(err);
    if (!entry) {
      const newSubscription = new Subscription({ symbol: req.body.symbol });
      newSubscription.save()
        .then((sub) => res.send(sub))
        .catch((error) => res.send(error));
    } else {
      res.send('Alredy registered.');
    }
  });
}

module.exports = {
  getAllCurrencies,
  getBySymbol,
  subscribe,
};
