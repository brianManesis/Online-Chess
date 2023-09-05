const express = require("express");
const gameCtrl = require("../controllers/gameCtrl");
const {protect} = require('../middleware/authMiddleware');

const game = express.Router();

game.post('/create', gameCtrl.createGame);
game.post('/join', gameCtrl.joinGame);

module.exports = game;