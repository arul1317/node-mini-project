const express = require('express');
const mongoose = require('mongoose');
const app = express();
const route =  require("./routes/index");

app.use(express.json({limit: '50mb'}));
app.use(route);
mongoose.connect("mongodb://localhost/test",{useNewUrlParser: true,useUnifiedTopology: true}) /*Connection to Database*/
mongoose.connection.on("connected",()=>{
    console.log("connected to the Mongodb database");
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
})

app.listen(5000,()=>{
    console.log("Listning on the port 5000")
})
