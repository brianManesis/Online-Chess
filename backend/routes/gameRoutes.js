const express = require("express");
const gameCtrl = require("../controllers/gameCtrl");
const {protect} = require('../middleware/authMiddleware');

const game = express.Router();

game.get('/create', gameCtrl.createGame);

module.exports = game;