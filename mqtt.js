const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://mqtt.flespi.io", {
    username: "vpdVaZMnkABMEcrImDpTg8aT8Yk5yPrrn84hFOGgFtFQADWuwH3e9dsm8anbPEAb",
});

client.on("connect", () => {
  console.log("mqtt connected")
});

client.subscribe('/subscribe');

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message}`);
});

