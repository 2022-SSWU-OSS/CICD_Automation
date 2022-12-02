var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/main.html');
});

io.on('connection', function (socket) {
    socket.on('receive', function (from, msg) {
        io.emit('client_receive', from +" : " + msg);
    });
});