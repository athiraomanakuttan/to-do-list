const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/to-do-list');
connection.then(()=> console.log("Connection successfull")).catch((err)=> console.log("connection failed error : ", err))
module.exports= { mongoose,connection}