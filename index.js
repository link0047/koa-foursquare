'use strict';

let request = require('koa-request');
let qs      = require('qs');

module.exports = function (client_id, client_secret) {
  let baseUrl = 'https://api.foursquare.com/v2/venues/';
  let credentials = qs.stringify({
    v: '20140806',
    client_id: client_id,
    client_secret: client_secret
  });

  /**
   * buildQS - Build a query string from JSON object
   *
   * @param  {object} params  json object of params to pass to a twitter endpoint.
   * @return {string}         return a stringified version of those params.
   */
  function buildQS (params) {
    if (params && Object.keys(params).length > 0) {
      return (qs.stringify(params) + '&');
    }
    return '';
  }

  return {
    getCategories: function *() {
      let url = baseUrl + 'categories?' + credentials;
      let res = yield request(url);
      return JSON.parse(res.body);
    },
    getVenues: function *(params) {
      let url = baseUrl + 'search?' + buildQS(params) + credentials;
      let res = yield request(url);
      return JSON.parse(res.body);
    },
    exploreVenues: function *(params) {
      let url = baseUrl + 'explore?' + buildQS(params) + credentials;
      let res = yield request(url);
      return JSON.parse(res.body);
    },
    getVenue: function *(params) {
      if (params.venue_id == undefined || params.id == undefined)
        console.error('venue_id or id must be specified');

      let id = (params.venue_id) ? params.venue_id : params.id;
      let url = baseUrl + ((id) ? id : '') + '?' + credentials;
      let res = yield request(url);
      return JSON.parse(res.body);
    }
  }
}