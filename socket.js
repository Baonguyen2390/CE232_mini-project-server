const { Server } = require("socket.io");
const { db } = require('./mongo')

const io = new Server(4000, { /* options */ });

io.on("connection", async (socket) => {
  console.log(`${socket.id} connected`);

  // find all record
  const data = await db.collection('TempAndHumi').find().toArray();
  console.log(data);
  
  socket.emit("initialize", data);
});

module.exports.socketBroadcast = (event, data) => {
  io.emit(event, data);
}