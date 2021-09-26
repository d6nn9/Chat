const socketIo = require('socket.io');
const Cookie = require('cookies');
const mongoose = require('../mongoose');
const User = require('../../models/User');


function socket(server) {
  const io = socketIo(server);

  io.use(async function (socket, next) {


    const cookie = new Cookie(socket.request, {});
    const sessionId = cookie.get('koa.sess');
    if (!sessionId) {
      return next(new Error("No session"));
    }


    const db = await mongoose.createConnection('mongodb://localhost/chat');
    const coll = await db.collection('sessions', {});
    const session = await coll.findOne({ _id: sessionId });
    if (!session) {
      return next(new Error("No find this session in db"));
    }


    const u = await User.findById(session.data.passport.user);
    if (!u) {
      return next(new Error("No find this user in db"));
    }


    socket.user = u;
    console.log('all good');
    next();
  });

  io.on('connection', function (socket) {
    // console.log('dasdasdasdas')
    socket.on('message', (txt) => {
      // console.log('dasdasdasdas')
      console.log(txt);
      socket.emit('user_message', {
        user: socket.user.displayName,
        text: txt,
        date: Date.now()
      });
    });
  });


}

module.exports = socket;
