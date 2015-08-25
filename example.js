'use strict';

let koa        = require('koa');
let config     = require('./config');
let foursquare = require('koa-foursquare')(config.fs.clientID, config.fs.clientSecret);
let app        = koa();

require('koa-qs')(app, 'first');

app.use(function *(next) {
  let ll = (this.query.ll !== undefined) ? this.query : '39.3968238,-74.5447961';
  let params = {
    ll: ll,
    limit: 15,
    venuePhotos: 1,
    categoryId: '4d4b7105d754a06374d81259',
  };
  this.type = 'json';
  this.body = yield foursquare.exploreVenues(params);
});

app.listen(3000);