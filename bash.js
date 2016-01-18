// console.log(process);
// console.log(Object.keys(process));
var doIt = require('./command.js');

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline
  var cmdArr = cmd.split(" ");
  // process.stdout.write()
 doIt(cmdArr[0], cmdArr.slice(1));


});