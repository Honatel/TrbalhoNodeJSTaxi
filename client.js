var Client = function(){
};
Client.prototype.teste = function(text){
    debugger;
    return console.log(`${text} ${myteste(2,3)}`);
};

Client.prototype.client = function client(){
    return true;
};

function myteste(a,b ){
    return a+b;
}
module.exports = Client;
