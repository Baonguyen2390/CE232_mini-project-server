const mongoose = require('mongoose');
const url = 'mongodb+srv://ngocrc:ndJ45DHQS37SeUm9@atlascluster.hks9agm.mongodb.net/CE232_mini_project?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Kết nối thành công với MongoDB!');
});

const tempAndHumiSchema = new mongoose.Schema({
  temperature : Number,
  humidity : Number,
}, {timestamps: true});

const tempAndHumiModel = mongoose.model("TempAndHumi", tempAndHumiSchema);

module.exports = { tempAndHumiModel }