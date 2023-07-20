const express = require("express");
const gameCtrl = require("../controllers/gameCtrl");

const router = express.Router();

router.use('/game', require('./gameRoutes'));
router.use('/auth', require('./authRoutes'));

module.exports = router;