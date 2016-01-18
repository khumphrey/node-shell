
var fs = require('fs');
var request = require('request');

function doIt (stdIn, doneFunc, input, file){
	var obj = {
	  	date: function(file){
	  		doneFunc(Date());
	  	},
	  	pwd: function(file) {
	  		doneFunc(process.cwd());
	  	},
	  	ls: function(){
			var strOut = '';
			fs.readdir('.', function(err, files) {
			  	if (err) throw err;
			  	files.forEach(function(file) {
			    	strOut += file.toString() + "\n";
			  	});
			  	doneFunc(strOut.trim());
			});
	  	},
	  	echo: function(file){
	  		doneFunc(file[0]);
	  	},
	  	cat: function(file){
	  		//array of argument files
	  		var counter = 0;
	  		var strOut = '';
	  		for(var i = 0; i < file.length; i++){
		  		fs.readFile(file[i], 'utf8', function(error, data){
		  			if (error) throw error;
		  			strOut+= data + "\n";
		  			counter+=1;
		  			if (counter===file.length) {
		  				doneFunc(strOut.trim());
		  			}
		  		});	
	  		}	  		
	  	},
	  	head: function(file, stdIn){
  			fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var headArr = data.split("\n").slice(0,5);
	  			var strOut ="";
	  			headArr.forEach(function(line){
	  				strOut+= line + "\n";
	  			});
	  			if(stdIn) {
	  				fs.writefile('fileOUT.txt',strOut, function (err) {
	  					if (err) throw err;
	  					doIt(null, doneFunc, stdIN, 'fileOUT.txt');
	  				});
	  			} else {
	  				doneFunc(strOut.trim());	
	  			}
	  			
	  			});	
	  	},
	  	tail: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var tailArr = data.split("\n").slice(-10);
	  			var strOut ="";
	  			tailArr.forEach(function(line){
	  				strOut+= line + "\n";
	  			});
	  			doneFunc(strOut.trim());
	  		});
	  	},
	  	sort: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var headArr = data.split("\n");
	  			headArr = headArr.map(function (line) {
	  				return line.trim();
	  			}).sort();
	  			var strOut ="";
	  			headArr.forEach(function(line){
	  				strOut+= line + "\n";
	  			});
	  			doneFunc(strOut.trim());
	  		});
	  	},

	  	uniq: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var headArr = data.split("\n");
	  			headArr = headArr.map(function (line) {
	  				return line.trim();
	  			}).sort();
	  			var strOut =headArr[0];
	  			for (var i = 1; i < headArr.length; i++) {
	  				if(headArr[i] !== headArr[i-1]) {
	  					strOut += ("\n" + headArr[i]);
	  				}
	  			}
	  			doneFunc(strOut);
	  		});
	  	},

	  	wc: function(file){
	  		fs.readFile(file[0], 'utf8', function(error, data){
	  			if (error) throw error;
	  			var headArr = data.split("\n");
	  			doneFunc(headArr.length);
	  		});
	  	},
	  	curl: function(file){
	  		request(file[0], function(error, response, body){
	  			if(response.statusCode === 200) {
	  				doneFunc(body);
	  			}
	  		});
	  	}
	};
	obj[input](file);
}


  module.exports = doIt;