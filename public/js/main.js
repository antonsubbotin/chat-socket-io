var socket = io();

window.onload = function() {
	$('form').submit(function() {
		socket.emit('chat message', {
			message: $('#m').val(),
			nickname: $('#n').val() || 'Anonimous'
		});
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg.nickname + ': ' + msg.message));
		$('#messages li').filter(':last').get(0).scrollIntoView(true);
	});
	socket.on('new connection', function(msg) {
		$('#messages').append($('<li>').addClass('log').text(msg));
	});
}
