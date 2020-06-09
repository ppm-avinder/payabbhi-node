const assert = require('assert');
const nock = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockRemittanceAccount = require('./data/remittanceAccount.json');

describe("RemittanceAccounts", function () {


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/remittance_accounts/123456789012345').reply(200, mockRemittanceAccount) });
    it('should retrieve a remittance account', async function() {
      var remittance_account = await payabbhi.remittance_account.retrieve('123456789012345');
      assert.equal(remittance_account.object, "remittance_account");
      assert.equal(remittance_account.id, "123456789012345");
    });
  }); // End of #retrieve()




}); // End of remittance accounts
