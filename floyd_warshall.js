var data = [
[0,10,10,4,10],
[2,0,2,2,10],
[9,2,0,1,1],
[1,1,2,0,20],
[1,3,5,4,0]];

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