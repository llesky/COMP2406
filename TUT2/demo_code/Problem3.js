
//libraries
var colour = require('colour');
var fs = require('fs'); 
var prompt = require('prompt');

var splitChords = function(line){

	//top line =1 or bottom line =0
	var mode = 0;

	//Counter Variables for the two lines
	var k = 1;
	var j = 0;

	var line1 = "";
	var line2 = "";

	var spl = line.split('');

	for (var c = 0; c < spl.length; c++){
		if (spl[c] == "["){
			mode = 1;
			line1 += Array(Math.max(k - j, 2)).join(" ");
			k = 0;
			j = 0;
		}else if (spl[c] == "]"){
			mode = 0;
			spl[c+1] = "";
		}else{
			if (mode == 0){
				line2 += spl[c];
				k++;
			}else{
				line1 += spl[c];
				j++;
			}
		}
	}

	if (line1.length == 0){
		return (line2).cyan;
	}else{
		return (line1.yellow + "\n" + line2.green);
	}
};

//Main body

prompt.start();
prompt.get('song', function (err, result) {
    if (err) { return onErr(err); }

    var songName = result.song.replace(/ /g,'_') + ".txt";
    console.log("\n");
    var array = fs.readFileSync('songs/' + songName,'utf8').split("\n"); 
	for(var i in array) {
	    console.log(splitChords(array[i]));
	}

  });




