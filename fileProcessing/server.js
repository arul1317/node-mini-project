const http = require('http');
const fileConversion = require('./fileConversion');

const server = http.createServer(fileConversion);

server.listen(3000, () => 
    console.log('listening to port 3000')
)