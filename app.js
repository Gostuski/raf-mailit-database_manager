const dotenv = require('dotenv');
const express = require('express');
const database = require('./services/database');
const router = require('./routes');
const startScheduler = require('./services/scheduler');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

database.connect();

startScheduler();

app.listen(
  process.env.PORT,
  console.log(`Server started on port : ${process.env.PORT}`),
);
