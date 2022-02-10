//Run: `node server.js`

const cfg = require('./server_settings.js');

var fs = require('fs');
var path = require('path');

function onRequest(request, response) {
    console.log('request ', request.url);

    //process the request, in this case simply reading a file based on the request url    
    var filePath = '.' + request.url;

    if (filePath == './') { //root should point to start page
        filePath = cfg.settings.startpage; //point to the start page
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') { //page not found: 404
                fs.readFile(cfg.settings.errpage, function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else { //other error
                response.writeHead(500);
                response.end('Something went wrong: '+error.code+' ..\n');
            }
        }
        else { //file read successfully, serve the content back

            //set content type based on file path extension for the browser to read it properly
            var extname = String(path.extname(filePath)).toLowerCase();
            var mimeTypes = {
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.wav': 'audio/wav',
                '.mp4': 'video/mp4',
                '.woff': 'application/font-woff',
                '.ttf': 'application/font-ttf',
                '.eot': 'application/vnd.ms-fontobject',
                '.otf': 'application/font-otf',
                '.wasm': 'application/wasm'
            };

            var contentType = mimeTypes[extname] || 'application/octet-stream';

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

function onStarted() {      
    console.log(`Server running at 
        ${cfg.settings.protocol}://${cfg.settings.host}:${cfg.settings.port}/`
    );
}

if(cfg.settings.protocol === 'http') {
    
    var http = require('http');
    http.createServer(
        onRequest
    ).listen( //SITE AVAILABLE ON PORT:
        cfg.settings.port,
        cfg.settings.host,
        onStarted
    );
}
else if (cfg.settings.protocol === 'https') {
    
    var https = require('https');
    // Options is used by the servers
    // pfx handles the certificate file
    var options = {
        pfx: fs.readFileSync(cfg.settings.sslpath),
        passphrase: "encrypted"
    };
    https.createServer(
        options,
        onRequest
    )
    .listen(
        cfg.settings.port,
        cfg.settings.host,
        onStarted
    );

}

