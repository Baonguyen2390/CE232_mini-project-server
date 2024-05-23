const mongoose = require('mongoose');
const url = 'mongodb+srv://baotungh:pU6p3nrN4SlTw8ru@nan.iiqx50a.mongodb.net/temp';

const mongoConnect = async () => {
  return mongoose.connect(url);
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Kết nối thành công với MongoDB!');
});

module.exports = { db, mongoConnect }