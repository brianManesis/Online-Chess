const socketIo = require("socket.io");

const url = "http://localhost:3000";

const socket = (server, app) => {
    const io = socketIo(server,{ 
        cors: {
          origin: url
        }
    });

    app.set("io", io);
    app.set("playerMap", new Map());
    app.set("gameMap", new Map());
  
    io.on("connection",(socket)=>{
      console.log("client connected: ",socket.id);
      const playerMap = app.get("playerMap");
      const gameMap = app.get("gameMap");

      socket.on("createGame", ({host, hostColor}) =>{
        console.log(socket.id +" created "+ host);
        if(!gameMap.get(host)){
          gameMap.set(host, {host,hostColor, opponent:false});
          playerMap.set(socket.id, host);
          socket.join(host);
        }
      });

      socket.on("joinGame", host =>{
        console.log(socket.id +" joined "+ host);
        const game = gameMap.get(host);
        if(game){
          game.opponent = true;
          playerMap.set(socket.id,host);
          socket.join(host);
        }
      });

      socket.on("playerJoined", username=>{
        const room = playerMap.get(socket.id);
        socket.to(room).emit("startGame",username);
        io.to(socket.id).emit("startGame", room)
      });

      socket.on("leaveGame", ()=>{
        console.log(socket.id +" left ");
        const room = playerMap.get(socket.id);
        playerMap.delete(socket.id);
        gameMap.delete(room);
        socket.leave(room);
        io.to(room).emit("endGame");
      });

      socket.on("move", move=>{
        console.log(move);
        const room = playerMap.get(socket.id);
        io.to(room).emit('move', move);
      });
      
      socket.on("disconnect",(reason)=>{
        console.log(reason+" "+socket.id);
        const room = playerMap.get(socket.id);
        io.to(room).emit('endGame');
      })
    });
}

module.exports = socket;