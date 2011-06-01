//http://side.rs/grand

var http = require('http'),
    io = require('socket.io'),
    events = require('events'),
    util = require('util'),
    sys = require('sys'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),

server = http.createServer(function(req, res) {
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(err + "\n");
				res.end();
				return;
			}
			res.writeHead(200);
		    res.write(file, 'binary');
		    res.end();
		});
	});  
});

server.listen(8080);

// socket.io
var socket = io.listen(server);
var messages = [];

socket.on('connection', function(client) {
	//for (msg in messages) client.send(messages[msg]);
	//client.broadcast(client.sessionId + ' connected<br />');
    client.on('message', function(message) {
		//var msg = '<p>client '+client.sessionId+' plays: note '+ message +'</p>';
		socket.broadcast(message);
		messages.push(message);
		if (messages.length > 128) messages.splice(0, 1);
    });
	client.on('disconnect', function() {
		//client.broadcast(client.sessionId + ' disconnected<br />' );
	});
});