'use strict'
const Resource = require('./resource');
const Helpers = require('./helpers');

class Remittance_Account extends Resource{
  constructor(config){
    super(config);
  }
  retrieve(id, cb) {
    return super.request('GET',  Helpers.url(this, id), {}, cb)
  }

}
module.exports = Remittance_Account;
