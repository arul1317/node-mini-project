const fs = require('fs');
const path = require("path");
const csv = require('csvtojson/v2');
const http = require('http');

//move file
const move = (file) => {
    let newPath = './Archive' +'/'+ file;
    let filePath = "./csvFile/"+file;
        console.log("moving to" + newPath);
        fs.rename(filePath, newPath, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Files Moved");
            }
        });
}

//send POST request
const makeHttpRequest=async (data)=>{
    return new Promise((resolve,reject)=>{
        try{
            const postData = JSON.stringify(data);
        
            const options = {
                host: 'localhost',
                path:'/api',
                port:3000,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive",
                    'Content-Length': Buffer.byteLength(postData)
                },
            };
            const req = http.request(options, (res) => {
           
                let data = '';
        
                console.log('Status Code:', res.statusCode);
        
                res.on('data', (chunk) => {
                    data += chunk;
                });
        
                res.on('end', () => {
                    console.log('Body: ', data);
                    resolve ("done");
                });
        
            }).on("error", (err) => {
                console.log("Error: ", err.message);
             });
        
            req.write(postData);
            req.end();
        }
        catch(err){
            throw (err)
        }
    })   
}

//convert to json
const readFileToJson=async (p) =>{
    try{
        const file = path.resolve(path.join("./csvFile/",p));
        return await fs.createReadStream(file,{
            flag: 'a+',
            encoding: 'UTF-8'})
            .pipe(csv({output:'json',noheader:false,trim:true,}))
            .subscribe(json=>json);   
    }
    catch(err){
        throw err
    }
}

//read directory
const readDir = () =>{
    try{
        return fs.readdirSync("./csvFile");
    }
    catch(err){
        throw (err)
    }
}

//send get request
const makeGetRequest =async () =>{
    try{
        const options = {
            host: 'localhost',
            path:'/api',
            port:3000,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const req = http.request(options, (res) => {
           
            let data = '';
        
            console.log('Status Code:', res.statusCode);
        
            res.on('data', (chunk) => {
                data += chunk;
               // console.log(JSON.parse(data));
            });
        
            res.on('end', () => {
                console.log('Body: ', JSON.parse(data));
                return(JSON.parse(data));
            });
        
        }).on("error", (err) => {
            console.log("Error: ", err.message);
        });
        req.end();
    }
    catch(err){
        throw (err)
    }
}

//main function
const main =async () =>{
    try{
        let files = await readDir();
        const allFilesData = files.map(e=> readFileToJson(e));
        let abcd = await Promise.all(allFilesData);
        
        await makeHttpRequest(abcd);
        
        console.log("http req completed");
        files.forEach((file)=>{
            move(file);
        })

        makeGetRequest();
       

    }
    catch(err){
        throw (err)
    }
}

main();