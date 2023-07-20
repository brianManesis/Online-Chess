const express = require('express');
const auth = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authCtrl');
const {protect} = require('../middleware/authMiddleware');

auth.post('/', registerUser);
auth.post('/login', loginUser);
auth.get('/me', protect, getMe);

module.exports = auth;