const User = require('../models/User');

module.exports = async function (ctx) {
  console.log(ctx.params);
  const u = await User.findOne({ verifyEmailToken: ctx.params.verifyEmailToken });

  if (!u) {
    ctx.throw(404, 'linck is not defined now');
  }


      u.verifyEmailToken = null;
  
      u.verifiedEmail = true;
  
      await u.save();
  
      await ctx.login(u);
      
      ctx.redirect('/');
  
};