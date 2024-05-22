const mqtt = require('mqtt')
const { socketBroadcast } = require('./socket')
const { db } = require('./mongo')

const client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: "BxT1pM1l2lJaExcxJm6TiSs37y1j4C1AiUIQAK2bJw84Gc4JcNgfDZ32lnlOrt66",
});

client.on("connect", () => {
  console.log("mqtt connected");
});

client.subscribe('/sensor/dht22');
client.on('message', async (topic, message) => {
  try {
    console.log(`Received message on topic ${topic}: ${message}`);
    const data = message.toString();
    console.log(data);
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
});

