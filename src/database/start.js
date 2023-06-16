const mongoose = require('mongoose');

exports.start = () =>
  mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
    })
    .then(() => console.log('Connection with database was successful'))
    .catch((err) => {
      console.log('Connection with database failed!');
      console.log(err);
    });
