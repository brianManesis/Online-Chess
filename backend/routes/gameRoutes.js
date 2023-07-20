const express = require("express");
const gameCtrl = require("../controllers/gameCtrl");

const game = express.Router();

game.get('/create', gameCtrl.createGame);

module.exports = game;