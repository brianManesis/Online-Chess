const express = require("express");
const socket = require("./socket");
const cors = require("cors");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;
const url = "http://localhost:3000";

const initializer = async()=>{
  await connectDB();
  server();
}
const server = async() =>{
  const app = express();
  app.use(express.json());
  app.use(cors(url));
  app.use(router);
  
  const server = app.listen(PORT, err=> {
    if(err) console.log(err)
    console.log("Server running on Port ", PORT)
  });
  
  socket(server, app);
}

initializer();