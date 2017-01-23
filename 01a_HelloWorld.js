//simple server listens on the provided port and responds with hello world

// load http module
var http = require('http');

// create http server
http.createServer(function (req, res) {
	
	//set content header
	res.writeHead(200, {'content-type': 'text/plain'});
	
	// write message and signal communication is complete
	res.end("Hello, World!");

}).listen(2406);

console.log('Server listening on port 2406');