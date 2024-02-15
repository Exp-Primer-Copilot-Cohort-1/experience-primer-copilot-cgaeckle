// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(request, response){
    // Get the file path from the URL
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    console.log(filename);
    // Check if the file exists
    fs.exists(filename, function(exists){
        if(!exists){
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        // If the file exists, read the file and send it to the client
        fs.readFile(filename, 'binary', function(err, file){
            if(err){
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write(err + '\n');
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
        });
    });
});
// Listen on port 8888
server.listen(8888);
console.log('Server running at http://