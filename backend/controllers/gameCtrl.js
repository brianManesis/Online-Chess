
const createGame = (req, res) =>{
    const io = req.app.get("io");
    const lobbys = req.app.get("lobbys");
    const { room } = req.body;
    console.log(room);
    if(!lobbys.has(room)){
      res.json({room});
    }
    else res.status(400).json({ message: 'Room does not exist' });
}

const joinGame = (req, res) =>{
    const io = req.app.get("io");
    const lobbys = req.app.get("lobbys");
    const { room } = req.body;
    console.log(room);
    if(lobbys.has(room)){
      res.json({room});
    }
    else res.status(400).json({ message: 'Room does not exist' });
}

module.exports = {createGame, joinGame};