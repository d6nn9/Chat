const passport = require('passport');

exports.get = async function (ctx, next) {
  if (ctx.isAuthenticated()) { // return !!ctx.state.user;
    console.dir(ctx.state);
    console.dir(ctx.session);
    ctx.body = ctx.render('welcome.pug');
  } else {
    ctx.body = ctx.render('login.pug');
  }
};
