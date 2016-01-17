var data = [
[0,1,4,5,3],
[2,0,5,2,1],
[3,2,0,1,1],
[1,6,2,0,2],
[1,3,5,4,0]];

//find negative cycles in 5x5 matrix
/*function shortestDistance(i, j, k){ //i: starting node, j: ending node, k: set of intermediate nodes that are allowed
  
  return Math.min(
    shortestDistance(i, j, k-1),
    shortestDistance(i, k, k-1) + shortestDistance(k, j, k-1)
    )
}*/

function floydWarshall(data){
  for(var k = 0; k < 5; k++){
    for(var i = 0; i < 5; i++){
      for(var j = 0; j < 5; j++){
        if(data[i][j] > data[i][k] + data[k][j]){
          data[i][j] = data[i][k] + data[k][j]
        }
      }
    }
  }
}

floydWarshall(data);

console.log(data);