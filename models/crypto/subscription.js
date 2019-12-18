const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  subscriptions: {
    type: Number,
    required: true,
    default: 1,
  },
});
const subscription = mongoose.model('subscription', SubscriptionSchema, 'subscriptions');

module.exports = subscription;
