const User = require('../models/User');
// const passportAuthenticate = require('./login');
const sendMail = require('../transport/smtp');
const uuid4 = require('uuid4');


exports.get = async function (ctx) {

  ctx.body = ctx.render('registration.pug');
  const verifyEmailToken = uuid4();
  console.log(verifyEmailToken);
};


exports.post = async function (ctx) {

  const verifyEmailToken = uuid4();
  console.log(verifyEmailToken);

  try {
    const u = new User({
      email: ctx.request.body.email,
      displayName: ctx.request.body.displayName,
      verifyEmailToken: verifyEmailToken,
      verifiedEmail: false,
    });

    await u.setPassword(ctx.request.body.password);

    await u.save();

    await sendMail({ mail: ctx.request.body.email, verifyEmailToken: verifyEmailToken });

  } catch (err) {

    if (err.name === 'ValidationError') {
      let errorMessages = '';
      for (let key in err.errors) {
        errorMessages += `${key}: ${err.errors[key].message}<br>`;
      }
      ctx.flash('error', `${errorMessages}`);
      ctx.redirect('/registrated');
      return;
    }

    console.log(err);
    errMesage = 'Упс, что то пошло не так! :(';
    ctx.flash('error', `${errMesage}`);
    ctx.redirect('/registrated');
  }

  // ctx.flash('message', `Подтвердите свой Email ${ctx.request.body.displayName}`);
  ctx.cookies.set('verification',
    `${ctx.request.body.displayName}`);
  ctx.body = ctx.render('verification.pug');
  ctx.flash('message', `Подтвердите свой Email ${ctx.request.body.displayName}`);

  // await sendMail(ctx.request.body.displayName, ctx.request.body.email)
};