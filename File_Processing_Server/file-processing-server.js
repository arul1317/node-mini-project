const express =require('express');
const app =express();
const JSZip = require("jszip");

const AdmZip = require('adm-zip');
const fs = require("fs");

const request =require('request')
var uploadDir = fs.readdirSync(__dirname+'/file1');   

// all csv file should be inside the File_Processing_Server Directory in
//in order to convert from csv to json and store.

const csvtojson=require('csvtojson')
const http=require('http')

const PORT =process.env.PORT || 3002

app.listen(PORT,()=>
    
    {
         console.log(`server is running at ${PORT}`);
         const testFolder=__dirname;
       
         const zip = new AdmZip();
 
    for(var i = 0; i < uploadDir.length;i++)
    { 
        zip.addLocalFile(__dirname+ '/file1/' + uploadDir[i]);
    }

    const downloadName = `${Date.now()}.zip`;

    zip.writeZip(__dirname+"/file1"+downloadName);
        


fs.readdir(__dirname+"\\file1", (err, files) => 
{
    files.forEach(file => 
        {
         var filename=__dirname+"\\file1\\"+file;
         filename = filename.replace(/\\/g, "\\\\");
         console.log(file);
     console.log("File name => "+ filename);

     csvfilepath = filename
     csvtojson()
     .fromFile(csvfilepath)
     .then((json) => 
     
           {
             var options = {
                 host: 'localhost',
                 port: 5000,
                 path: '/save',
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json',
                 }
             };
             
             
          
             var req = http.request(options, function(res)
             {
                 res.setEncoding('utf8');
                 res.on('data',(chunk) => {
                     console.log("body: " + chunk);
                 });
                 res.on('error',(error) =>{
                     console.log(error);
                 })
             });
     
             var tosend=JSON.stringify(json)
            req.write(tosend);
            req.end();
        
         })

        });

    })
     
     request.get('http://localhost:5000/check',function(error,response,body)
               {
                

               })

              
  

})