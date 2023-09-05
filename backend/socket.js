const socketIo = require("socket.io");

const url = "http://localhost:3000";

const socket = (server, app) => {
    const io = socketIo(server,{ 
        cors: {
          origin: url
        }
    });

    app.set("io", io);
    app.set("gameMap", new Map());
    app.set("lobbys", new Set());

    io.on("connection",(socket)=>{
      console.log("client connected: ",socket.id);
      const gameMap = app.get("gameMap");
      const lobbys = app.get("lobbys");

      socket.on("joinGame", room =>{
        console.log(socket.id +" joined "+ room);
        lobbys.add(room);
        gameMap.set(socket.id,room);
        socket.join(room);
      });

      socket.on("startGame", ()=>{
        const room = gameMap.get(socket.id);
        io.to(room).emit("ready");
      });

      socket.on("leaveGame", ()=>{
        console.log(socket.id +" left ");
        const room = gameMap.get(socket.id);
        gameMap.delete(socket.id);
        lobbys.delete(room);
        socket.leave(room);
        io.to(room).emit("endGame");
      });

      socket.on("move", move=>{
        console.log(move);
        const room = gameMap.get(socket.id);
        io.to(room).emit('move', move);
      });
      
      socket.on("disconnect",(reason)=>{
        console.log(reason+" "+socket.id);
        const room = gameMap.get(socket.id);
        io.to(room).emit('endGame');
      })
    });
}

module.exports = socket;