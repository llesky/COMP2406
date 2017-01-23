/* Example of javascript functions

Example adapted from:
 "Elequent Javascript" 2nd ed. by Marijn Haverbeke
http://eloquentjavascript.net/03_functions.html


Exercise 1: 

Modify the code given below so that the hill function makes use of the 
underscore character, just like the flat function does, 
expect the mountain tops will have to be drawn on the previous line of the output.

Also modify the code so that the following script portion will 
result in the terrain shown.

  //BUILD SCRIPT
  flat(3)
  hill(5);
  flat(2);
  hill(3);
  flat(4);
  hill(0);
  flat(2);
  //END SCRIPT


function and the program produces the following terrain.

    _____    ___
___/     \__/   \____/\__


Exercise 2: 

Modify the code from exercise 1 so you can have both hills and mountains. 
Mountains are require two output lines. 

After completing exercise 2 the following BUILD SCRIPT portion should produce the output shown. 

  //BUILD SCRIPT
  flat(3)
  mountain(3);
  flat(2);
  mountain(0);
  flat(4);
  hill(1);
  flat(1);
  //END SCRIPT


function and the program produces the following terrain.

       ___  
      /     \      /\          _
___/       \__/  \____/ \_


*/


var landscape = function() {
  
  var currentSize = 0;

  var lines = ["","",""];

  var flats = "";
  var hills = "";
  var mountains = "";

  var flat = function(size) {
	relief(0, size);
  };
  var hill = function(size) {
    relief(1, size);
  };
  var mountain = function(size) {
    relief(2, size);
  };

  var relief = function(size, length){

  	if (size < currentSize){
  		//move down
		for (var count = currentSize; count > size; count--){
			for (var x = 0; x < lines.length; x++){
	  			if (x == count-1){
	  				lines[x] += "\\";
	  			} else {
	  				lines[x] += " ";
	  			}
	  		}
  		}
  	} else if (size > currentSize){
  		//move up
  		for (var count = 0; count < (size - currentSize); count++){
			for (var x = 0; x < lines.length; x++){
	  			if (x == currentSize + count){
	  				lines[x] += "/";
	  			} else {
	  				lines[x] += " ";
	  			}
	  		}

  		}
  	}


  	for (var count = 0; count < length; count++){

  		for (var x = 0; x < lines.length; x++){
  			if (x == size){
  				lines[x] += "_";
  			} else {
  				lines[x] += " ";
  			}
  		}
    }
    currentSize = size;
  };

  //BUILD SCRIPT
	flat(3)
	mountain(3);
	flat(2);
	mountain(0);
	hill(2);
	flat(4);
	hill(1);
	flat(1);
  //END SCRIPT

  var output = "";

  for (var count = lines.length-1; count >= 0; count--){
  	output += lines[count] + ((count == 0) ? "" : "\n");
  }

  return output;


};

console.log(landscape());
//  ___/''''\______/'\_
