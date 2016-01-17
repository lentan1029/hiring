var Test = require("./test.js")

var data = {};

//get data via http
var http = require("http");
var req = http.get("http://fx.priceonomics.com/v1/rates/", function(res) {
  var bodyChunks = [];
  res.on('data', function(chunk) {
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    data = JSON.parse(body);
    console.log(data);

    //gets exchange rate given two currencies (str)
    function getExchangeRate(curr1, curr2){ //eg. curr1 = JPY
      return Number(data[curr1 + "_" + curr2]);
    }

    //gets dimension of the currency matrix (assuning it's a square matrix);
    function getDimensions(obj){
      var counter = 0
      for(key in obj){
        counter++
      }

      var dimension = Math.pow(counter, 0.5);

      if(dimension == ~~dimension){ //if it's a square matrix,
        return dimension;
      } else {
        throw Error("getDimensions() can only be called on a square matrix");
      }
    }

    /*function convertMatrix(data){
      var currencies = [];
      var x = getDimensions(data);
      for(var i = 0; i < x; i++){
        currencies.push([]);
      }

      var counter = 0;
      for(key in data){
        currencies[~~(counter/x)].push(key);
        counter++;
      }

      return currencies;
    }*/

    Test.assert(getExchangeRate("BTC","USD"), Number(data["BTC_USD"]));
    Test.assert(getDimensions(data), 4);

    var x = getDimensions(data);

    //Dynamic programming
    //strategy: modified floyd-warshall algorithm
    //we recursively solve the following subproblem:
    //  what is the most valuable path that can be formed from i to j while only using {0, ... , k} as the intermediate nodes?
    //we denote this as d(i, j, k);
    //the most valuable path either includes k or does not include k. if it does not include k, then it is equal to d(i, j, k-1)
    //if it includes k, then it's made up of two subpaths, from i to k and k to j, the value of which is  d(i, k, k-1) and d(k, j, k-1)
    //we take the max of the above two options, and update the memo table.
    //since we have a complete set of exchange rates (no Infinity), we can just use k to denote the set {0, ... , k}, no need to worry about valid neighbors

    //init
    //list of currencies
    var currencies = [];
    var firstCurrency = "";
    for(key in data){
      if(firstCurrency == ""){ firstCurrency = key.slice(0,3) }
      if(firstCurrency == key.slice(0,3)){
        currencies.push(key.slice(4,7))
      }
    }
    Test.assert(currencies.length, 4);

    //table of max value paths
    var memo = [];
    for(var i = 0; i < x; i++){
      var temp = [];
      for(var j = 0; j < x; j++){
        temp.push(getExchangeRate(currencies[i], currencies[j]));
      }
      memo.push(temp);
    }
    Test.assert(memo.length, 4);
    //Test.assert(memo[0][0], 0);

    //table to reverse engineer our max value path solution
    var path = [];
    for(var i = 0; i < x; i++){
      var temp = [];
      for(var j = 0; j < x; j++){
        temp.push(null);
      }
      memo.push(temp);
    }
    //subproblem
    for(var k = 0; k < x; k++){
      for(var i = 0; i < x; i++){
        for(var j = 0; j < x; j++){
          if(memo[i][j] < memo[i][k] * memo[k][j]){
            memo[i][j] = memo[i][k] * memo[k][j];
          }
        }
      }
    }

  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});



