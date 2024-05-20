const mqtt = require('mqtt')
const { socketBroadcast } = require('./socket')
const { tempAndHumiModel } = require('./mongo')

const client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: "XQ451T4HH2djXBkDywkTRfWpDjfQlbeyaFinUbVdbhDN3WUaJkcjb20wLSr57VXU",
});

client.on("connect", () => {
  console.log("mqtt connected");
});

client.subscribe('/sensor/dht22');

client.on('message', async (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
  const data = message.toString();

  // Sử dụng URLSearchParams để phân tích chuỗi truy vấn
  const params = new URLSearchParams(data);

  // Lấy giá trị nhiệt độ và độ ẩm
  const temperature = parseFloat(params.get('temperature'));
  const humidity = parseFloat(params.get('humidity'));

  // create and insert new data to database, auto mark time
  tempAndHumi = await tempAndHumiModel.create({ temperature, humidity });

  // send data to frontend
  socketBroadcast("data", tempAndHumi);

  // In kết quả
  console.log(`Temperature: ${temperature}`);
  console.log(`Humidity: ${humidity}`);

});

