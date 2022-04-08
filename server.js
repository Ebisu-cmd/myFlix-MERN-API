// imported modules
const http = require('http'),
    url = require('url'),
    fs = require('fs');

// creating a http web server
http.createServer((request, response) => {
    let addr = request.url;
    let q = url.parse(addr, true);
    filePath = '';
    
    // logs url and time of request
    fs.appendFile('log.txt', `URL: ${addr} \nTimestamp: ${new Date()}\n\n`, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Added to log.');
        }
    });

    // choses what html file to set filePath variable to
    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    }
    else {
        filePath = 'index.html';
    }

    // reads content of file designated by filePath and sends file to client
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');