const fs = require('fs');
const http = require('http');
const csvtojson = require('csvtojson');
const moveFile = require('move-file');

const filePath = __dirname +'/CSVFiles';

const readAndConvertFile = () => {
    let arr;
    fs.readdir(filePath, (err, files) => {
        if(err) throw err;
        files.forEach((file) => {
            csvtojson().fromStream(fs.createReadStream(filePath +'/'+ file))
            .subscribe((json) => {
                return new Promise((resolve, reject) => {
                    resolve(json)
                })
            })
            .then(async (doc) => {
                for(let i = 0; i<doc.length; i+=1000) {
                    arr = doc.slice(i, i+1000)
                    await new Promise((resolve, reject) => {
                        let con = {
                            host: '127.0.0.1',
                            port: '8080',
                            path: 'update/' + file,
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }

                        let toPost = http.request(con, (res) => {
                            res.setEncoding('utf-8');
                            res.on('data', (chunk) => {
                                resolve(chunk);
                            })
                            res.on('error', (err) => {
                                console.log(err);
                                reject(err);
                            })
                        })
                        toPost.write(JSON.stringify(arr));
                        toPost.end();
                    })
                }
            })
            .then(() => {
                let con = {
                    host: '127.0.0.1',
                    port: '8080',
                    path: '/' + file,
                };
                http.get(con, (response) => {
                    response.on('data', (data) =>{
                        let arr = JSON.parse(data);
                        console.log(arr);
    
                        moveFile(filePath+'/'+file, __dirname+'/archive/'+file)
                    })
                    response.on('error', (err) => console.log(err));
                })
            }).catch((err) => console.log(err))
        })
    })
}

module.exports = readAndConvertFile;