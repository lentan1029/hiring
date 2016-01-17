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
    var currencies = ['BTC', 'USD', 'JPY', 'EUR']; //can be extended

    function getExchangeRate(curr1, curr2){ //eg. curr1 = JPY
      return Number(data[curr1 + "_" + curr2]);
    }

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

    function convertMatrix(data){
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
    }

    Test.assert(getExchangeRate("BTC","USD"), Number(data["BTC_USD"]));
    Test.assert(getDimensions(data), 4);
    console.log(convertMatrix(data));


    //Dynamic programming
    //strategy: modification of floyd-warshall algorithm
    



  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});



