
const createGame = (req, res) =>{
    const io = req.app.get("io");
    const clientCount = io.engine.clientsCount;
    let color;
    if(clientCount === 1){
      color = "White";
    }
    else if(clientCount === 2){
      color = "Black";
    }
    else{
      return res.status(400).json({ message: 'Room is full' });
    }
    res.json({color});
}

module.exports = {createGame};