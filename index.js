'use strict';

var request     = require('koa-request');
var querystring = require('querystring');

module.exports = function (client_id, client_secret) {
  var baseUrl = 'https://api.foursquare.com/v2/venues/';
  var credentials = querystring.stringify({
    v: '20140806',
    client_id: client_id,
    client_secret: client_secret
  });

  return {
    getCategories: function *() {
      var url = baseUrl + 'categories?' + credentials;
      var res = yield request(url);
      return JSON.parse(res.body);
    },
    getVenues: function *(params) {
      var url = baseUrl + 'search?' + querystring.stringify(params) + '&' + credentials;
      var res = yield request(url);
      return JSON.parse(res.body);
    },
    exploreVenues: function *(params) {
      var url = baseUrl + 'explore?' + querystring.stringify(params) + '&' + credentials;
      var res = yield request(url);
      return JSON.parse(res.body);
    },
    getVenue: function *(params) {
      var url = baseUrl + params.venue_id + '&' + credentials;
      var res = yield request(url);
      return JSON.parse(res.body);
    }
  }
}