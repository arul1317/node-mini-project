const express =require('express');
const mongoose =require('mongoose');
const bodyparser =require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const csvtojson=require('csvtojson')

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
                        
    db.once('open',()=>                // to check that of database is connected or not
      {
            console.log('database conection established');
      })

  const app =express();     
  
  app.use(bodyparser.json({limit: "300mb"}));
   app.use(bodyparser.urlencoded({limit: "300mb", extended: true, parameterLimit:999999}));
   
  app.put('/save',(res,req)=>
  {
      ++filecount
    //console.log(res.body);

    req.write(filecount+"=> data recieved")     //acknowledge that data recieved
    
    var jsonn=res.body;
    
   // console.log("******"+typeof res.body);
    //data assigned to var jsonn
           
           //first=JSON.stringify(jsonn[0]);
           //last=jsonn[jsonn.length()-1];

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


      app.get('/check',async (res,req,next)=>
      
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

                  var f1="["+file_first+"]";
                  //console.log(f1);
                  //console.log(db_first);

               

                  if(f1==db_first)
                  {

                    console.log("***********first data matched  with databse**********")
                  }

                  else{

                    console.log("*******first element not matched************* ")
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


                var f2="["+file_last+"]";
                 // console.log(f2);
                  //console.log(db_last);

               

                  if(f2==db_last)
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
      
  

      
 

     


const PORT =process.env.PORT || 5000

app.listen(PORT,()=>
    
    {
         console.log(`server is running at ${PORT}`);

    })

