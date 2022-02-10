//Run: `node server.js`

const cfg = require('./server_settings.js');

var fs = require('fs');
var path = require('path');

function server(request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = cfg.settings.startpage;
    }

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

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile(cfg.settings.errpage, function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Something went wrong: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

function started() {      
    console.log(`Server running at 
        ${cfg.settings.protocol}://${cfg.settings.host}:${cfg.settings.port}/`
    );
}

if(cfg.settings.protocol === 'http') {
    
    var http = require('http');
    http.createServer(
        server
    ).listen( //SITE AVAILABLE ON PORT:
        cfg.settings.port,
        cfg.settings.host,
        started
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
        server
    )
    .listen(
        cfg.settings.port,
        cfg.settings.host,
        started
    );

}

