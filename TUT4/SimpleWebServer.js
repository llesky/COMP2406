//simple server listens on the provided port and responds with requested pages

// load modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime-types');
var qs = require('querystring');
const ROOT = "./public_html";

const widgetsData =  {
	barbaloot: "A modification on the idea of a chest of drawers. A barbaloot uses patented rinker-flink technology to randomly exchange the locks and contents of each drawer at a prespecified interval. <span id='slogan'>Barbaloot, you can't lose your belongings if you don't know where they aren't.</span>",
	diffendoofer: "Ever wish your scale knew better than to tell you the truth? Well now it does! The diffendoofer&trade; is not your every day bathroom scale. Preset gravity coeficients, altered physical vibration frequencies, reassuring lies, all easily programmable with the included diffendoofr smartphone app!",
	flooberblub: "Toilet related smartphone accidents account for 1/3rd of all broken smartphones, and 3/5ths of all ear infections! Protect your smartphone with a flooberblub, the world's leading floatation-based retrieval technology. Clincal trials have proven flooberblubs will catch 85% of all falling smartphones before they hit the surface of the water. The remaining 15% will be retreived through the flooberblubs system of flushing and filtering. <span class='disclaimer'>Results may vary. Flooberblubs are not a replacement for common sense, and cannot be held liable for the consequences of your butterfingers.</span>",
	flunnel: "Cut out the middleman! With a flunnel you can pour large amounts of things into small openings that are very far away! Simply pour your large amount of things into the adjustably-sized funnel-style opening, and they will be accelerated to obscene speeds as they exit! Make rice without getting off the couch, organize your collection of antique shards of glass, relocate entire ant colonies! You can do it all with flunnel!",
	hackencracks: "<span id='slogan'>Break stuff!</span> Hackencracks are a series of microscopic swordsmen suspended in a semi-solid gel that, when activated, go to work punching, kicking, and chopping away at whichever surface you've applied them to. Now available in viking and ninja flavours!",
	quimney: "A quimney is an autonomous quad-copter drone with the predisposition to oppose disorganization. Simply release a quimney in your home and it will go to work grabbing things with its usb3.1-powered electro-magnetic grappling hands. It's like a roomba for your things! <span id='slogan'>Organize your home with a quimney!</span> <span class='disclaimer'>Warning, quimneys do not distinguish inanimate objects from animate ones, and will in fact see animate objects as vectors of disorganization and seek to set them still. Do not operate around small children or anyone with a less than perfectly symmetrical face.</span>"
};


// create http server
var server = http.createServer(handleRequest);
server.listen(2406);
console.log('Server listening on port 2406');

// handler for incoming requests
function handleRequest(req, res) {
	console.log("Request for: "+req.url);
	var data = "";

	var urlObj = url.parse(req.url, true);

	if (urlObj.pathname === '/widgets/description'){
		data = (widgetsData[urlObj.query.widgetName]);
	}else if (req.method === 'POST' && urlObj.pathname === '/userStyle'){

		req.setEncoding('utf8');

		var body = '';
		req.on('data', function(chunk) {
			body+=chunk;
		}).on('end', function() {
			console.log(JSON.parse(body));
			var name = JSON.parse(body).username;
			fs.writeFile('./users/'+name+'.txt', body, function(err) {
	    		if(err) {
	    			return console.log(err);
				}
				console.log('file saved: /users/'+name+'.txt');
			}); 
		});
		res.writeHead(200, {'content-type': 'application/json'});
		res.end("Your data was recorded. Thanks!");
		return;
	}else if (req.url.endsWith('.html')){
		console.log("HTML requested");
		if(fs.existsSync(ROOT + req.url)){
			data = getFileContents(ROOT + req.url);
		}else{
			data = getFileContents(ROOT+"/404.html");
		}
	}else {
		if(fs.existsSync("."+req.url)){
			var stats = fs.statSync("."+req.url);
			if(stats.isDirectory()){
				data = getFileContents(ROOT+"/index.html");
			}else{
				data = getFileContents("."+req.url);
			}
		}else{
			data = getFileContents(ROOT+"/404.html");
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