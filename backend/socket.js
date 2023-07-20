const socketIo = require("socket.io");

const url = "http://localhost:3000";

const socket = (server, app) => {
    const io = socketIo(server,{ 
        cors: {
          origin: url
        }
    });

    app.set("io", io);
    
    io.on("connection",(socket)=>{
      console.log("client connected: ",socket.id)
      socket.join("game");

      socket.on("move", move=>{
        console.log(move);
        socket.broadcast.emit('move', move);
      });
      
      socket.on("disconnect",(reason)=>{
        console.log(reason)
      })
    });
}

module.exports = socket;