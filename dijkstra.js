var dist = [ //[0][1] refers to distance from node 0 to node 1
[0,10,10,4,10],
[2,0,2,2,10],
[9,2,0,1,1],
[1,1,2,0,20],
[1,3,5,4,0]];

function dijkstra(dist, start, end){
  //check if dist is a square matrix
  for(var i = 0; i < dist.length; i++){
    if(dist[i].length != dist.length){
      throw Error("dijkstra() can only be called on square matrices");
    }
  }

  //check if start and end nodes are valid
  if(start > dist.length - 1 || end > dist.length - 1) {
    throw Error("parameters out of bounds for given matrix");
  }

  var unvisited = [];
  //init
  for(var j = 0; j < dist.length; j++){
    unvisited.push(j);
  }

  //starting from start node, check all neighbors
  var current = start;
  while(unvisited.length){
    unvisited.splice(unvisited.indexOf(current), 1);
    var min = -1; //init;
    for(var k = 0; k < unvisited.length; k++){ //for all unvisited neighbors
      //if distance form start to current and from current to unvisited neighbor is smaller than start to unvisited neighbor, replace
      if(dist[current][unvisited[k]] + dist[start][current] < dist[start][unvisited[k]]){
        dist[start][unvisited[k]] = dist[current][unvisited[k]] + dist[start][current]
      }
      if(dist[start][unvisited[k]] < dist[start][min] || min == -1){
        min = unvisited[k];
        console.log(min);
      }
    }
    current = min;
  }

  console.log(dist);
  return dist[start][end];
}

console.log(dijkstra(dist, 0, 4));
