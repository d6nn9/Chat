const CSRF = require('koa-csrf');

exports.init = app => {app.use(new CSRF({
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}))}
