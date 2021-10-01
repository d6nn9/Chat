const passport = require('passport');

exports.get = async function (ctx, next) {
  if (ctx.isAuthenticated()) { // return !!ctx.state.user;
    // console.dir(ctx.state.user.displayName);
    // console.dir(ctx.session);
    console.log(ctx.csrf)
    ctx.body = ctx.render('welcome.pug');
  } else {
    console.log(ctx.csrf)
    ctx.body = ctx.render('login.pug');
  }
};
