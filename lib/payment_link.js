'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers')

class Payment_Link extends Resource {
  constructor(config){
    super(config);
  }

  create(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST',  Helpers.url(this), p.params, p.cb)
  }

  all(params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('GET', Helpers.url(this, null, p.params), {}, p.cb);
  }

  cancel(id, params, cb) {
    var p = Helpers.sanitize(params, cb);
    return super.request('POST', Helpers.nurl(this, id, 'cancel'), p.params, p.cb);
  }

  retrieve(id,cb){
    return super.request('GET',Helpers.url(this,id),{},cb);
  }

  payments(id, cb) {
    return super.request('GET',  Helpers.nurl(this, id, 'payments'), {}, cb)
  }
}
module.exports = Payment_Link;
