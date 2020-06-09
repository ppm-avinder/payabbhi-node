'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');


class Payout extends Resource{
  constructor(config) {
    super(config);
  }


  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

  create(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST',  Helpers.url(this), p.params, p.cb)
  }

}

module.exports = Payout;
