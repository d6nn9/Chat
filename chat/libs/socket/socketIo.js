const socketIo = require('socket.io');
const Cookie = require('cookies');
const mongoose = require('../mongoose');
const User = require('../../models/User');
const { createAdapter } = require("@socket.io/redis-adapter");
const { createClient } = require("redis");

const io = new Server();

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();


function socket(server) {

  const io = socketIo(server);

  io.adapter(createAdapter(pubClient, subClient));

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
  

  // sub.on("message", (channel, message) => {
  //   // console.log(`Received ${message} from ${channel}`);
  //   if (channel == "chat"){
  //       // socket.on('message', (txt) => {
  //       //   console.log(txt);
  //         socket.broadcast.emit('user_message', {
  //           user: socket.user.displayName,
  //           text: message,
  //           date: Date.now()
  //         });
  //       };
  //   if (channel == 'system-chat')
  //       socket.emit('system_message', message);
  //   // console.log(`Received ${message} from ${channel}`);
  // });

  io.on('connection', function (socket) {
    console.log(`????????????????????????????${socket.id}???????????????????????????????????????????????`)

    // sub.subscribe("chat", 'system-chat', (err, count) => {
    //   if (err) {
    //     console.error("Failed to subscribe: %s", err.message);
    //   } else {
    //     console.log(
    //       `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    //     );
    //   }
    // });

    socket.on('message', (message) => {
        // socket.message = `${txt}`
        // JSON.stringify(socket)
        // pub.publish('chat', `${txt}`);
        socket.broadcast.emit('user_message', {        
        user: socket.user.displayName,
        text: message,
        date: Date.now()
      });
    })

    socket.emit('system_message', `${socket.user.displayName} join in chat!`)


    // pub.publish('system-chat', `${socket.user.displayName} join in chat!`);


    socket.on('disconnect', function(){
      socket.disconnect(true);
      console.log('???????????????????????????????????????????????????????????????????????????')
    });
  });


};

module.exports = socket;
