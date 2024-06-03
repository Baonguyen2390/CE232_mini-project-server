const mqtt = require('mqtt')
const { socketBroadcast } = require('./socket')
const { db } = require('./mongo')

module.exports.mqttInit = async () => {
  const client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: "XQ451T4HH2djXBkDywkTRfWpDjfQlbeyaFinUbVdbhDN3WUaJkcjb20wLSr57VXU",
  });
  
  client.on("connect", () => {
    console.log("mqtt connected");
  });
  
  client.subscribe('/sensor/dht22');
  client.on('message', onMessage);
}

const onMessage = async (topic, message) => {
  try {
    console.log(`Received message on topic ${topic}: ${message}`);
    const data = message.toString();

    // Sử dụng URLSearchParams để phân tích chuỗi truy vấn
    const params = new URLSearchParams(data);

    // Lấy giá trị nhiệt độ và độ ẩm
    const temperature = parseFloat(params.get('temperature'));
    const humidity = parseFloat(params.get('humidity'));
    let time = new Date();
   
    db.collection('TempAndHumi').insertOne({temperature, humidity, time});

    socketBroadcast("data", {temperature, humidity, time});

    console.log(`Temperature: ${temperature}`);
    console.log(`Humidity: ${humidity}`);
    console.log(`time: ${time}`);
  } catch (error) {
    console.error(error)
  }
}