var express	= require("express"),
	app 	= express(),
	http	= require('http').Server(app),
	io		= require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.broadcast.emit('new connection', 'new user has connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(app.get('port'), function(){
	console.log('listening on *:', app.get('port'));
});

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });