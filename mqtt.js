const mqtt = require('mqtt')
const { socketBroadcast } = require('./socket')

const client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: "Ao9Iur1nAlajwdAfwNYOt1MueZgQZBp5n0KFrfSf67pDFFMjdgHILSY7WS1OtWbl",
});

client.on("connect", () => {
  console.log("mqtt connected");
});

client.subscribe('/sensor/dht22');

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
   data = message.toString();

  // Sử dụng URLSearchParams để phân tích chuỗi truy vấn
  const params = new URLSearchParams(data);

  // Lấy giá trị nhiệt độ và độ ẩm
  const temperature = parseFloat(params.get('temperature'));
  const humidity = parseFloat(params.get('humidity'));

  // In kết quả
  console.log(`Temperature: ${temperature}`);
  console.log(`Humidity: ${humidity}`);

});

