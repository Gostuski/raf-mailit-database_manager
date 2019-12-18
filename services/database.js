const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('useFindAndModify', false);

async function connect() {
  mongoose
    .connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster1-m6jdl.mongodb.net/mailit-db?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Mongo db connected');
    })
    .catch((err) => console.log('Error connecting to database : ', err));
}

module.exports = {
  connect,
};
