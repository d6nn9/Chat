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
    // console.log(socket.request);
    // console.log(cookie);
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
    console.log(`????????????????????????????${socket.id}???????????????????????????????????????????????`)

    sub.subscribe("chat", 'system-chat', (err, count) => {
      if (err) {
        console.error("Failed to subscribe: %s", err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
      }
    });

    sub.on("message", (channel, message) => {
      // console.log(`Received ${message} from ${channel}`);
      if (channel == "chat"){
          // socket.on('message', (txt) => {
          //   console.log(txt);
            socket.broadcast.emit('user_message', {
              user: socket.user.displayName,
              text: message,
              date: Date.now()
            });
          };
      if (channel == 'system-chat')
          socket.emit('system_message', message);
      // console.log(`Received ${message} from ${channel}`);
    });


    socket.on('message', (txt) => {
        pub.publish('chat', `${txt}`);
    })

    pub.publish('system-chat', `${socket.user.displayName} join in chat!`);


    socket.on('disconnect', function(){
      socket.disconnect(true);
      console.log('???????????????????????????????????????????????????????????????????????????')
    });
  });


};

module.exports = socket;
