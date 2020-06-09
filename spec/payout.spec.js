const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockPayout = require('./data/payout.json');
const mockPayouts = require('./data/payouts.json');

describe("Payouts", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/payouts').reply(200, mockPayout) });
    it('should create a new payout', async function() {
      var payout = await payabbhi.payouts.create({
        amount:1000,
      	currency : "INR",
      	merchant_reference_id : "ref_00001",
      	remittance_account_no :"1234567890",
      	beneficiary_account_no:"01234567890",
      	beneficiary_ifsc:"ABCD1234567",
      	beneficiary_name:"BenTest",
      	method:"bank_transfer",
      	purpose:"cashback",
      	narration:"info",
      	instrument:"NEFT"
      });
      assert.equal(payout.object, "payout");
      assert.equal(payout.id, "pout_DBzMRrGfIQtHoBs7");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/payouts/pout_DBzMRrGfIQtHoBs7').reply(200, mockPayout) });
    it('should retrieve a payout', async function() {
      var payout = await payabbhi.payouts.retrieve('pout_DBzMRrGfIQtHoBs7');
      assert.equal(payout.object, "payout");
      assert.equal(payout.id, "pout_DBzMRrGfIQtHoBs7");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/payouts').reply(200, mockPayouts) });
    it('should return payouts', async function() {
      var payouts = await payabbhi.payouts.all();
      assert.equal(payouts.total_count, 12);
      assert.equal(payouts.object, "list");
      assert.equal(payouts.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/payouts?count=2').reply(200, mockPayouts) });
    it('should return payouts with param', async function() {
      var payouts = await payabbhi.payouts.all({count: 2});
      assert.equal(payouts.total_count, 12);
      assert.equal(payouts.object, "list");
      assert.equal(payouts.data.length, 2);
    });
  }); // End of #all(param)


}); // End of payouts
