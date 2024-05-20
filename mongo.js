const mongoose = require('mongoose');
//const { temperature, humidity } = require('./one.js');
const url = 'mongodb+srv://21522390:Baonguyenmongodb2012@cluster0.zgjlcaq.mongodb.net/sensor';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Kết nối thành công với MongoDB!');
});

const collection = db.collection('TempAndHumi');

const data = {
  time: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
  temperature: 12.3,
  humidity: 45.6
};

collection.insertOne(data, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Ghi dữ liệu thành công!');
});

collection.findOne({'time' : data.time}, (err, docs) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Dữ liệu nhiệt độ và độ ẩm:');
  console.log(docs);
});
