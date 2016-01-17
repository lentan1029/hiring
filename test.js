(function (exports){
  //exports.assert
  exports.assert = function(a, b, msg){
    if(a === b){
      console.log(msg ? msg : "passed");
      return 1;
    } else {
      console.log("failed, " + a + " !== " + b);
      return 0;
    }
  };

})(this); //((typeof window === 'undefined') ? module.exports : window));

