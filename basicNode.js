
// functions for node
exports.print =  function(text = "") {
       console.log(text);
    };
exports.cls = function() {
        console.clear;
    };
exports.input = function(text) {
        this.readline.question(text,function(response){
            console.log("Response was: ",response);
            readline.close()
            return response;
        })
    };
exports.init = function() {
    this.readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
}