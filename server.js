var Client = require('./client');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 8000;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`); 
  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  
  var teste = `.${parsedUrl.pathname}`;
  const ext = path.parse(pathname).ext;

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        var client = new Client();
        client.process(data.toString());
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);