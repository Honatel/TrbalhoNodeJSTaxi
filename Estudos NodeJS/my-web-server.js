	var http = require('http');
    const body = 'LALALLA';

	http.createServer(function(req,res){

        res.writeHead(200,{'Content-Length': Buffer.byteLength(body),'Content-Type':'text/plain'});
        res.end('Hello Word\n');
    }).listen(8080);
    
    console.log('servidor rodando na porta 8080');