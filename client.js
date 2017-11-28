var Client = function(){
};
Client.prototype.process = function(data){
    debugger;
    processData(data);
};

function processData(evt) {

    var fileArr = evt.split('\n');
    var listObject = new Array();
  
    for (var i=0; i<fileArr.length; i++) {
        var fileLine = fileArr[i].split(';');
        if (i > 0){
            var ObjXY = {endereco : fileLine[1], Y : fileLine[4], X : fileLine[3]};
            
            listObject.push(ObjXY);
        }
               
        }
    }

module.exports = Client;
//node --inspect server.js (comando para debugar)