var Client = require('./client');
var http = require("http");
var fs = require("fs");
var PORT = 8000;

var server = http.createServer(function(request, response) {
    console.log("Acessando: ", request.url);

    var fileName = "";
    // var contentType = "application/json";
    var contentType = "text/plain";

    if(request.url.toLowerCase().indexOf("api/arestas") > 0) {
        fileName = "/files/arestas.txt";
    }

    if(request.url.toLowerCase().indexOf("api/vertices") > 0) {
        fileName = "/files/vertices.txt";
    }

    fs.readFile(__dirname + fileName, function(err, data) {
        if(err) {
            response.writeHead(404, {"Content-Type": "application/json"});
            response.end(JSON.stringify(err));
            return;
        }

        response.writeHead(200, {"Content-Type": contentType});
        response.end(data);
    });
    var client = new Client();
    client.process();

}).listen(PORT, function(){
    console.log("Server rodando na porta %d", PORT);
});