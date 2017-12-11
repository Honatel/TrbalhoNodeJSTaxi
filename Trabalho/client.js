//npm install node-rest-client
var Clientvar = function(){};

Clientvar.prototype.process = function(){
    processData();
};

function processData(){
    var Client = require('node-rest-client').Client;
    
    var client = new Client();
    var baseUrl = "http://localhost:8000/";
    
    var arestas = "";
    var vertices = "";
    client.get(baseUrl + "api/arestas", function (dataArestas, response) {     
        var arestas = dataArestas.toString();
        var vertices = "";
    
        client.get(baseUrl + "api/vertices", function (dataVertices, response) {
            vertices = dataVertices.toString();
            //primeira parte
            var i =32;
            var value = 0;
            var count = 1;
            var valuesArray = new Array(32); // criando o array de vertices   
            while(value < 32){
                valuesArray[value] = `${count}`; // populando o array de vertices
                value ++;
                count ++;
            };

            // seginda parte 
            var arrayLinhasVertices = new Array(14062);// criando o array de vertices e seus valores 
            var vetorvertices = vertices.split("\n"); //separando em linhas
            for(v= 0; v < vetorvertices.length; v++){ // for para dividir palavra por palavra.
                var linhaArray = vetorvertices[v].split(" "); // separando as palavras
                arrayLinhasVertices[v] = linhaArray; // colocando o array em uma lista de arrays
            };

                        //função para tentar pegar os valores das aresra
            function getValueArestas(value1, value2){
                var lat1;
                var lon1;
                var lat2;
                var lon2;
                
                for(x = 0; x < arrayLinhasVertices.length; x++){
                    if(x ==  parseInt(value1) - 1){
                        lat1 = arrayLinhasVertices[x][1];
                        lon1 = arrayLinhasVertices[x][2];
                    }
                
                    if(x == parseInt(value2) - 1){
                        lat2 = arrayLinhasVertices[x][1];
                        lon2 = arrayLinhasVertices[x][2];
                   }
                }

                return CalcRadiusDistance(lat1, lon1, lat2, lon2, "K");
            };
            
            function CalcRadiusDistance(lat1, lon1, lat2, lon2)
            {
                rad = function(x) {return x*Math.PI/180;}
          
                var R     = 6378.137;                  //Raio da Terra no km (WGS84)
                var dLat  = rad( lat2 - lat1 );
                var dLong = rad( lon2 - lon1 );
          
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c;

                return  parseFloat(d.toFixed(3));
           };

           function dijkstra(start, graph) {
                var distance = {},
                    prev = {},
                    vertices = {},
                    u;
            
                // Setup distance sentinel
                graph.vertex.forEach(function(v_i) {
                    distance[v_i] = Infinity;
                    prev[v_i] = null;
                    vertices[v_i] = true;
                });
            
                distance[start] = 0;
                while (Object.keys(vertices).length > 0) {
                    // Obtenha um vértice cuja separação seja mínima.
                    u = Object.keys(vertices).reduce(function(prev, v_i) {
                        return distance[prev] > distance[v_i] ? +v_i : prev;
                    }, Object.keys(vertices)[0]);
            
                    graph.edge.filter(function(edge) { //verifica se o array de conexão das arestas, se preenchem os requisitos abaixo e constroi um array
                        var from = edge[0],
                            to 	 = edge[1];
                        return from=== `${u}` || to===`${u}`;
                    })
                    .forEach(function(edge) {
                        var to = edge[1]===u ? edge[0] : edge[1];

                        //var dist = distance[u] === Infinity ?edge[2] :distance[u] + edge[2];
                        var dist = distance[u] + edge[2];
                        
                        if (distance[to] > dist) {
                            distance[to] = dist;
                            prev[to] = u;
                        }
                    });
                    // Mark visited
                    delete vertices[u];
                }
                
                var ArrayPev = new Array();
                var indiceArrayPrav = 0;
                var valuein = 0;
                for (ind = Object.keys(prev).length; ind >= 1; ind--){
                    
                    if(ind == Object.keys(prev).length){
                        ArrayPev[indiceArrayPrav] = ind;
                        indiceArrayPrav++;
                        ArrayPev[indiceArrayPrav] = parseInt(prev[ind]);
                        valuein= parseInt(prev[ind]);
                        indiceArrayPrav++;
                    }

                    if (valuein == ind && ind != Object.keys(prev).length){
                        ArrayPev[indiceArrayPrav] = parseInt(prev[ind]);
                        indiceArrayPrav++;
                    }
                };
                console.log(ArrayPev);
                return distance;
            };
        
            var keysValues = new Array();
            var index =0; 
            var vetorarestas = arestas.split("\n"); // Separando as arestas por linha
            for(j = 0; j< vetorarestas.length; j++ ){ // for para pegar cada linha
                var linha = vetorarestas[j]; // pegando a primeira linha que identifica as ligaçõs da aresta principal
                var linhaArray = vetorarestas[j].split(" ");
                var principal = linhaArray[0]; //pegando o primeirio numero da linha

                var valor1 =linhaArray[1]; // pegando o segundo numero da linha
                var valor2 =linhaArray[2]; // pegando o terceiro numero da linha 
                var valor3 =linhaArray[3]; // pegano o quarto numero da linha
                var valor4 =linhaArray[4]; // pegando o quinto numero da linha

                var teste = getValueArestas(principal, valor1);
                
                if(index > 0)
                    index ++;

                keysValues[index] = [principal,valor1,getValueArestas(principal, valor1)];
                index++;
                keysValues[index] = [principal,valor2,getValueArestas(principal, valor2)];
                index++;
                keysValues[index] = [principal,valor3,getValueArestas(principal, valor3)];
                index++;
                keysValues[index] = [principal,valor4,getValueArestas(principal, valor4)];
                index++;

                if (principal == 32){
                    // var graph = {
                    //     vertex: valuesArray,
                    //     edge:               
                    //         keysValues
                    // };
                    // console.log(dijkstra("2", graph));
                    var graph = {
                        vertex: ["1","2","3","4","5","6"],
                        edge: [,
                        /* vertex1, vertex2, weight */
                            ["1", "2", 7],
                            ["1", "3", 9],
                            ["1", "6", 14],
                            ["2", "3", 10],
                            ["2", "4", 15],
                            ["3", "4", 11],
                            ["3", "6", 2],
                            ["4", "5", 6],
                            ["5", "6", 9]
                        ]
                    };
                    console.log(dijkstra("2", graph));                    
                    return false;
                }
            };
            console.log(arestas);
            console.log(vertices);            
            console.log("app terminou");
         });
     });
};


 module.exports = Clientvar;
 