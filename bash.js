// console.log(process);
// console.log(Object.keys(process));
var doIt = require('./command.js');


var stdIN = null;

process.stdout.write("prompt > ");
var done = function(output){
	//show output
	process.stdout.write(output + "\n");
	//show prompt
	process.stdout.write("prompt > ");
};
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
    var cmdString = data.toString().trim();
    var cmdList = cmdString.split(/\s*\|\s*/g);
    if (cmdList.length > 1) {
        stdIN = cmdList[1];
    }

    var cmdArr = cmdList[0].split(" ");
    // process.stdout.write()
 doIt(stdIN, done, cmdArr[0], cmdArr.slice(1));


});
