const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(
    'mongodb+srv://Dusan:gostus@cluster1-m6jdl.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Mongo db connected');
  })
  .catch(err => console.log('Error connecting to database : ', err));

app.listen(process.env.PORT, console.log(`Server started on port : ${process.env.PORT}`));
