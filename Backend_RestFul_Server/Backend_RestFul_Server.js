const express =require('express');
const mongoose =require('mongoose');
const bodyparser =require('body-parser');  
var MongoClient = require('mongodb').MongoClient;  // to retreive data
var url = "mongodb://localhost:27017/";

const csvtojson=require('csvtojson')  // module Csv to JSON Convertor

const fs =require('fs');

const User =require('../models/database');   // import custom database 
const { json } = require('express');

var first;
var last;

var filecount =0;

mongoose.connect('mongodb://localhost:27017/new_data',   // mongodb connection 
{useNewUrlParser: true,
useUnifiedTopology:true})
const db =mongoose.connection           
                                        
    db.on('error',(err)=>
      {
        console.log(err)
      })
                        
    db.once('open',()=>    // to  that of database is connected or not
      {
            console.log('database conection established');
      })

  const app =express();      // for instance 
  
  app.use(bodyparser.json({limit: "300mb"}));   // for large data file 
   app.use(bodyparser.urlencoded({limit: "300mb", extended: true, parameterLimit:999999}));
   
  app.put('/',(res,req)=>
  {
      ++filecount
       req.write(filecount+"=> data recieved")     //acknowledge that data recieved
    
    var jsonn=res.body;
    
  

    User.collection.insert(jsonn, function (err, docs)   // batch insert all data 
        {
            if (err)  
            { 
                return console.error(err);
            } 
            else 
            {
                console.log("JSON Array inserted to Collection New-Data");
            }
        })

       
        req.write(filecount+"=>  data stored")    //acknowledge that data stored
        req.end();
  
      })


      app.get('/data_check',async (res,req,next)=>   //get method for data checking
      
      {
        await  MongoClient.connect(url, function(err, db)    // retrieve the first and last data from database
    { 
              if (err) throw err;
              var dbo = db.db("new_data");
              var mysort = { _id: -1 };


              dbo.collection("s_datas").find().limit(1).toArray(function(err, result) // retrieve the first data from database
              {
                
                csvfilepath = "..\\File_Processing_Server\\file1\\1.dat"
                csvtojson()
                .fromFile(csvfilepath)
                  .then((json) => 
                {
                  var file_first=JSON.stringify(json[0]); 
                  delete result[0]['_id'];
                  var db_first=JSON.stringify(result);

                  var first_data_="["+file_first+"]";
                 

                  if(first_data_==db_first)    // comparing first data
                  {

                    console.log("first data matched  with databse")
                  }

                  else{

                    console.log("first element not matched")
                  }
                         
                  
              })

            })

            

              dbo.collection("s_datas").find().sort({_id:-1}).limit(1).toArray(function(err, result)  // retrieve the last data from database
              {
                
                csvfilepath = "..\\File_Processing_Server\\file1\\5.dat"
                 csvtojson()
                .fromFile(csvfilepath)
                  .then((json) => 
                {
                  var file_last=JSON.stringify(json[json.length-1]); 
                  delete result[0]['_id'];
                  var db_last=JSON.stringify(result);


                var last_data="["+file_last+"]";
                
                  if(last_data==db_last)   // last data checking 
                  {

                    console.log("***********last element  data matched  with databse**********")
                  }

                  else{

                    console.log("*********last element  not matched************** ")
                  }
                         
              })
              })
            
      
      })

  })
      
const PORT =process.env.PORT || 5000    // used port 5000 

app.listen(PORT,()=>
    
    {
         console.log(`server is running at ${PORT}`);

    })

