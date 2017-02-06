//simple server listens on the provided port and responds with requested pages

// load modules
var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
const ROOT = "./public";

// create http server
var server = http.createServer(handleRequest);
server.listen(2406);
console.log('Server listening on port 2406');

// handler for incoming requests
function handleRequest(req, res) {
	//process the request
	console.log("Request for: "+req.url);
	var filename = ROOT+req.url;

	var code;
	var data = "";

	var stats = fs.statSync(filename);
	if(stats.isDirectory()){
		data = getFileContents("index.html");
	}else{
		try{
			data = getFileContents(filename);
		} catch (err){
			data = getFileContents(ROOT+"/404.html");
		}
	}
	code = 200;
	// content header
	res.writeHead(code, {'content-type': mime.lookup(filename)||'text/html'});
	// write message and signal communication is complete
	res.end(data);
};

//read a file and returns its contents
function getFileContents(filename){
	
	var contents;
	
	//handle good requests
	console.log("Getting file");
	contents = fs.readFileSync(filename);
	console.log("typeof: "+typeof(contents));
	return contents;
}