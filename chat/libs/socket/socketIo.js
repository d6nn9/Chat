const socketIo = require('socket.io');
const Cookie = require('cookies');
const Redis = require('ioredis');
const sub = new Redis();
const pub = new Redis();
const mongoose = require('../mongoose');
const User = require('../../models/User');


function socket(server) {
  // redis.set("foo", "bar");
  const io = socketIo(server);

  // io.adapter(socketRedis)

  io.use(async function (socket, next) {


    const cookie = new Cookie(socket.request, {});
    console.log(socket.request);
    console.log(cookie);
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

    sub.subscribe("message", (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
      }
    });

    sub.on("message", (channel, message) => {
      console.log(`Received ${message} from ${channel}`);
      socket.emit('system_message', message);
      console.log(`Received ${message} from ${channel}`);
    });

    pub.publish('message', `Hello ${socket.user.displayName}!`);


    socket.on('message', (txt) => {

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
