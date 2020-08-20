const csv= require('csvtojson')
const fs = require('fs');
const http = require('http');
const folder = __dirname+'/temp';
 var arr;

 /*Put all the files in temp folder*/

  /*Batch insert to Database for all the files*/
 fs.readdir(folder,(err,files)=>{
  if(err) throw err;
  files.forEach((file)=>{
    csv()
    .fromStream(fs.createReadStream(folder+'/'+file))
    .subscribe((json)=>{
      return new Promise((resolve,reject)=>{
        resolve(json)
      })
      })
      .then(async(done)=>{
        for(let i = 0;i<done.length;i+= 1000){
          arr= done.slice(i,i+1000)
          await new Promise((resolve,reject)=>{
            var option ={
              host:'localhost',
              port: '5000',
              path: '/upload/'+file,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
            }
            }
          
           var postserver = http.request(option, (res)=>{
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                resolve(chunk);
            });
            res.on('error',(err)=>{
              console.log(err); 
             reject(err)
            })
            })
            postserver.write(JSON.stringify(arr));
            postserver.end();
        })
        
        }
      })
      .then(()=>{
        var options = {
          host: 'localhost',
          port: '5000',
          path: '/'+file,
        
        };
        http.get(options, function(response) {
          response.on('data', function (data) {
            var arr = JSON.parse(data);
            console.log(arr);
            fs.renameSync(folder+'/'+file,__dirname+"/archive/"+file);
        });
          response.on('error',(err)=>{
            console.log(err); 
          })       
        })
      })
      .catch((err)=>{
        console.log(err);
      })
      
    })
       
})


