const app = require('./app');
// const {Server} = require('socket.io')
const io = require('socket.io')(app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
}))

io.on('connection', function (socket) {
  socket.broadcast.emit('message', ` connected.`);
  // io.emit()
  socket.emit('message', 'hello', (response) => {
    console.log("delivered", response);
  });

  socket.on('test', (txt, cb) => {
    console.log(txt);
    cb('from server');
  });

})
