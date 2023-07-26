const express = require("express");
const gameCtrl = require("../controllers/gameCtrl");

const router = express.Router();

router.use('/api/game', require('./gameRoutes'));
router.use('/api/auth', require('./authRoutes'));

module.exports = router;