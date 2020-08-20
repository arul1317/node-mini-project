const express =require('express'); 
const app =express();


const AdmZip = require('adm-zip'); // extenal module ADmZip to archieve
const fs = require("fs");

const request =require('request')
var uploadDir = fs.readdirSync(__dirname+'/file1');    // 



const csvtojson=require('csvtojson')
const http=require('http')

const PORT =process.env.PORT || 5002   // port used 5002

app.listen(PORT,()=>
    
    {
         console.log(`server is running at ${PORT}`);
        // const testFolder=__dirname;
       
         const zip = new AdmZip();
 
    for(var i = 0; i < uploadDir.length;i++)   // Archieving all files
    { 
        zip.addLocalFile(__dirname+ '/file1/' + uploadDir[i]);
    }

    const downloadName = `${Date.now()}.zip`;

    zip.writeZip(__dirname+"/file1"+downloadName);
        


fs.readdir(__dirname+"\\file1", (err, files) =>    // reading all files 
{
    files.forEach(file => 
        {
         var filename=__dirname+"\\file1\\"+file;
         filename = filename.replace(/\\/g, "\\\\"); 
        
         console.log("File name => "+ filename);

     csvfilepath = filename
     csvtojson()
     .fromFile(csvfilepath)
     .then((output) => 
     
           {
             var options = {          //details  for api server to call
                 host: 'localhost',
                 port: 5000,
                 path: '/store',
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
     
             var tosend=JSON.stringify(output)
            req.write(tosend);
            req.end();
        
         })

        });

    })
     
     request.get('http://localhost:5000/data_check',function(error,response,body)
               {
                

               })

              
  

})