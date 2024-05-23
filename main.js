const { mongoConnect } = require('./src/mongo');
const { socketInit } = require('./src/socket');
const { mqttInit } = require('./src/mqtt');

mongoConnect().then(() => {
    socketInit();
    mqttInit();
})