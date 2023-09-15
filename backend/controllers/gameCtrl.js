
const createGame = (req, res) =>{
    const games = req.app.get("gameMap");
    const { host, hostColor } = req.body;
    if(!games.get(host)){
      res.json({host,hostColor});
    }
    else res.status(400).json({ message: 'Room already exists' });
}

const joinGame = (req, res) =>{
    const games = req.app.get("gameMap");
    const { host, opponent } = req.body;
    const game = games.get(host);
    if(game){
      const color = game.hostColor == "White"? "Black":"White";
      res.json({host, opponent, color});
    }
    else res.status(400).json({ message: 'Room does not exist' });
}

module.exports = {createGame, joinGame};