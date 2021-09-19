var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = new GoogleStrategy({
    clientID: 'chrome-era-321209',
    clientSecret: 'google',
    callbackURL: "http://localhost:3000/oauth/google",
    profileFields: ['displayName', 'email'],
    scope: ['email'],
  },
  function(accessToken, refreshToken, profile, done) {

    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    console.log(done)

    if (!profile.emails || !profile.emails.length) {
      return done(null, false, {message: 'Нет email!'});
    }
    const email = profile.emails[0].value;

    User.findOne({email}, (err, user) => {
      if (err) return done(err);

      if (!user) {
        User.create({
          email,
          displayName: profile.displayName,
          providers: [{id: 'facebook', profile}]
        }, (err, user) => {
          if (err) return done(err);
          done(null, user, { message: 'Добро пожаловать!' });
        });
      } else {
        if (user.providers.find(provider => provider.id === 'facebook')) {
          done(null, user, { message: 'Добро пожаловать!' });
        } else {
          user.providers.push({ id: 'facebook', profile });
          user.save(err => {
            if (err) return done(err);

            done(null, user, { message: 'Добро пожаловать!' });
          });
        }
      }
    });
  }
);