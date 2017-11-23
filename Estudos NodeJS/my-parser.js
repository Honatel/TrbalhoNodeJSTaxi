var Parser = require('./parser');

var fs = require('fs');

fs.readFile('example-log.txt','utf8',function(err,logData){
    if(err) throw err;

    var text = logData.toString();

    var parser = new Parser();

    console.log(Soma(2, 4));
    console.log(parser.parse(text));
});

function Soma(a, b){
    return a + b;
}