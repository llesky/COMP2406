//simple server listens on the provided port and responds with requested pages

// load modules
var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
const ROOT = "./public_html";

// create http server
var server = http.createServer(handleRequest);
server.listen(2406);
console.log('Server listening on port 2406');

// handler for incoming requests
function handleRequest(req, res) {
	console.log("Request for: "+req.url);
	var data = "";

	if (req.url.endsWith('.html')){
		console.log("HTML requested");
		if(fs.existsSync(ROOT + req.url)){
			data = getFileContents(ROOT + req.url);
		}else{
			data = getFileContents(ROOT+"/404.html");
		}
	}else {

		var stats = fs.statSync("."+req.url);
		if(stats.isDirectory()){
			data = getFileContents(ROOT+"/index.html");
		}else{
			try{
				data = getFileContents("."+req.url);
			} catch (err){
				data = getFileContents(ROOT+"/404.html");
			}
		}
	}
	code = 200;
	res.writeHead(code, {'content-type': mime.lookup(req.url)||'text/html'});
	res.end(data);
};


function getFileContents(filename){
	var contents;
	console.log("Getting file");
	contents = fs.readFileSync(filename);
	console.log("typeof: "+typeof(contents));
	return contents;
}