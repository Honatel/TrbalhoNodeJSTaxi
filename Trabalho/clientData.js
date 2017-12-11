var Server = require('./server');

var server = new server();
server.process();

function processData(evt) {
    debugger;
    
    var graph1 = {
        vertex: ["1","2","3"],
        edge: [,
        /* vertex1, vertex2, weight */
            ["1", "2", 4],
            ["1", "3", 7],
            ["2", "3", 1]
        ]
    },
    graph2 = {
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
            // Obtain a vertex whose distaance is minimum.
            u = Object.keys(vertices).reduce(function(prev, v_i) {
                return distance[prev] > distance[v_i] ? +v_i : prev;
            }, Object.keys(vertices)[0]);
    
            graph.edge.filter(function(edge) {
                var from = edge[0],
                    to 	 = edge[1];
                return from===u || to===u;
            })
            .forEach(function(edge) {
                var to = edge[1]===u ? edge[0] : edge[1],
                    dist = distance[u] + edge[2];
    
                if (distance[to] > dist) {
                    distance[to] = dist;
                    prev[to] = u;
                }
            });
            // Mark visited
            delete vertices[u];
        }
        return distance;
    };
    
    console.log(dijkstra("1", graph1));
    // var fileArr = evt.split('\n');
    // var listObject = new Array();
    // //teste
  
    // for (var i=0; i<fileArr.length; i++) {
    //     var fileLine = fileArr[i].split(';');
    //     if (i > 0){
    //         var ObjXY = {endereco : fileLine[1], Y : fileLine[4], X : fileLine[3]};
            
    //         listObject.push(ObjXY);
    //     }
               
    //     }
    }



module.exports = Client;
// var Client = function(){
// };
// Client.prototype.process = function(data1, data2){
//     debugger;
//     var d1 = data1;
//     var d2 = data2;
    
//     processData(d1);
// };
//node --inspect server.js (comando para debugar)