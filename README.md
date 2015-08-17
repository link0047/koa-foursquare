
# koa-foursquare

Similar to [foursquarevenues](https://github.com/sjlu/foursquarevenues),
except it uses [koa-request](https://github.com/dionoid/koa-request) instead of [request](https://github.com/request/request) to access [foursquares venue API](https://developer.foursquare.com/overview/venues).

### Installation

Install using [npm](https://www.npmjs.org/):

```sh
npm install koa-foursquare --save
```

### Example
Basic usage:

```javascript
'use strict';
var koa        = require('koa');
var config     = require('./config');
var foursquare = require('koa-foursquare')(config.fs.clientID, config.fs.clientSecret);
var app        = koa();

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
```
## Methods

### getCategories

Returns a hierarchical list of categories applied to venues.

No parameters.

### getVenues

Returns a list of venues near the current location, optionally matching a search term.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | url parameters |

Parameter options found [here](https://developer.foursquare.com/docs/venues/search) under **Parameters** section.

### exploreVenues

Returns a list of recommended venues near the current location.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | url parameters |

Parameter options found [here](https://developer.foursquare.com/docs/venues/explore) under **Parameters** section.

### getVenue

Gives details about a venue, including location, mayorship, tags, tips, specials, and category.

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | url parameters |

Parameter options found [here](https://developer.foursquare.com/docs/venues/venues) under **Parameters** section.

### Contributing

Please submit all issues and pull requests to the [koa-foursquare](https://github.com/link0047/koa-foursquare) repository!

### Support

If you have any problem or suggestion please open an issue [here](https://github.com/link0047/koa-foursquare/issues).