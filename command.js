
var fs = require('fs');

function doIt (input, file){
	var obj = {
	  	date: function(file){
	  		// return Date();
	  		process.stdout.write(Date() + "\n");
	  		process.stdout.write("prompt > ");
	  	},
	  	pwd: function(file) {
	  		//return process.cwd();
	  		process.stdout.write(process.cwd() + "\n");
	  		process.stdout.write("prompt > ");
	  	},
	  	ls: function(){
			// var str = '';
			// fs.readdir('.', function(err, files) {
			//   if (err) throw err;
			// 	files.forEach(function(file) {
			// 	    str+= file.toString() + "\n";
			// 	});
			// 	return str;
			// });
			fs.readdir('.', function(err, files) {
			  	if (err) throw err;
			  	files.forEach(function(file) {
			    	process.stdout.write(file.toString() + "\n");
			  	});
			  	process.stdout.write("prompt > ");
			});

	  	},
	  	echo: function(file){
	  		process.stdout.write(file[0] + "\n");
	  		process.stdout.write("prompt > ");
	  	},
	  	cat: function(file){
	  		//array of argument files
	  		for(var i = 0; i < file.length; i++){
		  		fs.readFile(file[i], 'utf8', function(error, data){
		  			if (error) throw error;
		  			process.stdout.write(data + "\n");
		  			process.stdout.write("prompt > ");
		  		});	
	  		}	  		
	  	},
	  	head: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var headArr = data.split("\n").slice(0,5);
	  			headArr.forEach(function(line){
	  				process.stdout.write(line + "\n");
	  			});
	  			process.stdout.write("prompt > ");
	  		});
	  	},
	  	tail: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var tailArr = data.split("\n").slice(-10);
	  			tailArr.forEach(function(line){
	  				process.stdout.write(line + "\n");
	  			});
	  			process.stdout.write("prompt > ");
	  		});
	  	}
	};
	obj[input](file);
	//process.stdout.write( obj[input]());
 //  	process.stdout.write('\nprompt > ');
}


  module.exports = doIt;