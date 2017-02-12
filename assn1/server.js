

/** Load Modules **/

var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime-types');

/** Create server **/

const PORT = 2406;
var server = http.createServer(handleRequest);
server.listen(PORT);
console.log('SServer started [' + PORT + ']');

/** Request handler **/

function handleRequest(req, res) {
	console.log("Request: "+ req.url);
	var filename = "."  + req.url; 	
	var code=500;
	var data = "";

	var query = url.parse(req.url, true).query;

	if (req.url == "/allheroes"){
		var heroes = fs.readdirSync('./heroes');
		res.writeHead(200, {'content-Type': 'application/json'});
		res.write(JSON.stringify(heroes));
		res.end(data);
		return;
	}

	if (req.url.startsWith('/hero')){
		var heroname = query.name;
		console.log(query)
		if(fs.existsSync("./heroes/" + heroname)){
			data = fs.readFileSync("./heroes/" + heroname);
			code = 200;
		}else{
			console.log("Hero file not found " + heroname);
			code = 404;
		}
	} else if(fs.existsSync(filename)){		
		var stats = fs.statSync(filename);
		if(stats.isDirectory()){
			filename += "/index.html";
		}
		console.log("Getting file: "+filename);
		data = fs.readFileSync(filename);
		code = 200;
	}else{
		console.log("File not found " + heroname);
		code = 404;
	}
	
	res.writeHead(code, {'content-type': mime.lookup(filename)|| 'text/html'});
	res.end(data);
};