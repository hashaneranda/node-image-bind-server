/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongoDb = async (url) => {
  await mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err));
};

module.exports = mongoDb;
