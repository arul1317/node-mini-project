const csv= require('csvtojson')
const fs = require('fs');
const http = require('http');
const folder = __dirname+'/temp';

 /*Put all the files in temp folder*/

  /*single insert for all the files*/
 
 fs.readdir(folder,(err,files)=>{
  if(err) throw err;
  files.forEach((file)=>{
    csv()
    .fromStream(fs.createReadStream(folder+'/'+file))
    .subscribe( (json)=>{
     return new Promise((resolve,reject)=>{
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
           console.log(chunk);
            resolve(chunk);
        });
        res.on('error',(err)=>{
          console.log(err); 
         reject(err)
        })
        })
        postserver.write(JSON.stringify(json));
        postserver.end();
      })
    })
    .then((res)=>{
      var options = {
        host: 'localhost',
        port: '5000',
        path: '/'+file,
      
      };
      http.get(options, function(response) {
        response.on('data', function (data) {
          var arr = JSON.parse(data);
          arr.forEach((obj)=>{
            ['_id','__v','__t'].forEach(e=> delete obj[e])
          }
            )
            if(JSON.stringify (arr[0]) === JSON.stringify(res[0]) && JSON.stringify(arr[1]) === JSON.stringify(res[res.length-1])){
              console.log(`First and last elements are matching for ${file}`)
            }
            else{
              console.log(`First and last elements are not matching for ${file}`)
            }
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




