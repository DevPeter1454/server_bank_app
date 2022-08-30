/*jshint esversion : 6 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cloudinary  = require('cloudinary');
app.use(cors());
app.use(express.urlencoded({extended: true, limit:"50mb"}));
app.use(express.json({limit:"50mb"}));
app.use(express.static('/web/icons'));
app.use(express.static('/web/canvaskit'));
app.use(express.static('/web/assets'));
require('dotenv').config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_DB_URI;
const userRouter = require('./routes/user.route');
app.use('/user', userRouter);
app.get("/*",(req,res)=>{
  res.sendFile(__dirname + "/web/index.html");
})

mongoose.connect(URI, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log('Connected to MongoDB');
  }
});
app.listen(PORT, ()=>{
    console.log(`app is listening at ${PORT}`);
});
