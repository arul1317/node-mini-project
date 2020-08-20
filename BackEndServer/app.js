const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//importing route midlleware
const details = require('./routes/details')

//app
const app = express();

//middleware
app.use(bodyParser.json({limit: '1000mb',extended:true}));
app.use(bodyParser.urlencoded({limit: '1000mb',extended:true}));

//route middleware
app.use('/api',details)

//db
mongoose.connect(`mongodb://localhost/test`,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() =>{console.log("db connected")})
.catch((err)=>{console.log("error connecting to database")})

app.listen(3000,()=>{
    console.log("listening at 3000");
})
