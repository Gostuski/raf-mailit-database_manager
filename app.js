const dotenv = require('dotenv');
const express = require('express');
const database = require('./services/database');
const router = require('./routes');
const logger = require('./middleware/logger');

const app = express();

dotenv.config();
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

database.connect();

app.listen(
  process.env.PORT,
  console.log(`Server started on port : ${process.env.PORT}`),
);
