const assert   = require('assert');
const nock     = require('nock');
const payabbhi = require('../lib/payabbhi')('some_access_id', 'some_secret_key');
const API_BASE = 'https://payabbhi.com/api/v1';

const mockInvoice   = require('./data/invoice.json');
const mockInvoices  = require('./data/invoices.json');
const mockLineItems = require('./data/invoice.line_items.json');
const mockPayments  = require('./data/invoice.payments.json');
const mockCancel    = require('./data/invoice.cancel.json')

describe("Invoices", function () {

  describe('#create()', function() {
    beforeEach(() => { nock(API_BASE).post('/invoices').reply(200, mockInvoice) });
    it('should create a new invoice', async function() {
      var invoice = await payabbhi.invoices.create({
        customer_id: "cust_2WmsQoSRZMWWkcZg",
        due_date: 1549176945,
        billing_method: "automatic",
        description: "Test Invoice",
        currency: "INR",
        notify_by: "email",
        invoice_no: "123123123123",
        line_items: [{id: "item_jYGaYf14SeZ13DkJ"}]
      });
      assert.equal(invoice.object, "invoice");
      assert.equal(invoice.id, "invt_UZqFoPLamaZqLFkZ");
    });
  }); // End of #create()


  describe('#retrieve()', function () {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_UZqFoPLamaZqLFkZ').reply(200, mockInvoice) });
    it('should retrieve an invoice', async function() {
      var invoice = await payabbhi.invoices.retrieve('invt_UZqFoPLamaZqLFkZ');
      assert.equal(invoice.object, "invoice");
      assert.equal(invoice.id, "invt_UZqFoPLamaZqLFkZ");
    });
  }); // End of #retrieve()


  describe('#all()', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices').reply(200, mockInvoices) });
    it('should return invoices', async function() {
      var invoices = await payabbhi.invoices.all();
      assert.equal(invoices.total_count, 5);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
    });
  }); // End of #all()

  describe('#all(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices?count=2').reply(200, mockInvoices) });
    it('should return invoices with params', async function() {
      var invoices = await payabbhi.invoices.all({count: 2});
      assert.equal(invoices.total_count, 5);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
    });
  }); // End of #all(param)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices?count=2&billing_method=automatic').reply(200, mockInvoices) });
    it('should return invoices with params', async function() {
      var invoices = await payabbhi.invoices.all({count: 2, billing_method: 'automatic'});
      assert.equal(invoices.total_count, 5);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
    });
  }); // End of #all(params)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices?billing_method=automatic&due_date_from=15838483&due_date_to=16454454&customer_id=cust_2WmsQoSRZMWWkcZg&subscription_id=sub_xLH108FJwUlX47SI').reply(200, mockInvoices) });
    it('should return invoices without common pagination params', async function() {
      var invoices = await payabbhi.invoices.all({billing_method: 'automatic', due_date_from: 15838483, due_date_to: 16454454, customer_id: 'cust_2WmsQoSRZMWWkcZg', subscription_id: 'sub_xLH108FJwUlX47SI'});
      assert.equal(invoices.total_count, 5);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
    });
  }); // End of #all(params)

  describe('#all(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices?count=2&skip=1&from=15234567&to=15678943&billing_method=automatic&due_date_from=15838483&due_date_to=16454454&customer_id=cust_2WmsQoSRZMWWkcZg&subscription_id=sub_xLH108FJwUlX47SI').reply(200, mockInvoices) });
    it('should return invoices with all params', async function() {
      var invoices = await payabbhi.invoices.all({count: 2, skip: 1, from: 15234567, to: 15678943, billing_method: 'automatic', due_date_from: 15838483, due_date_to: 16454454, customer_id: 'cust_2WmsQoSRZMWWkcZg', subscription_id: 'sub_xLH108FJwUlX47SI'});
      assert.equal(invoices.total_count, 5);
      assert.equal(invoices.object, "list");
      assert.equal(invoices.data.length, 2);
    });
  }); // End of #all(params)


  describe('#cancel()', function() {
    beforeEach(() => { nock(API_BASE).post('/invoices/invt_UZqFoPLamaZqLFkZ/cancel').reply(200, mockCancel) });
    it('should cancel an invoice', async function() {
      var invoice = await payabbhi.invoices.cancel('invt_UZqFoPLamaZqLFkZ');
      assert.equal(invoice.id, "invt_UZqFoPLamaZqLFkZ");
      assert.equal(invoice.object, "invoice");
      assert.equal(invoice.status, "cancelled");
    });
  }); // End of #cancel()


  describe('#items()', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_srxOZZk6dIgWTVls/line_items').reply(200, mockLineItems) });
    it('should return line items for an invoices', async function() {
      var line_items = await payabbhi.invoices.line_items('invt_srxOZZk6dIgWTVls');
      assert.equal(line_items.total_count, 2);
      assert.equal(line_items.object, "list");
      assert.equal(line_items.data.length, 2);
    });
  }); // End of #items()

  describe('#items(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_srxOZZk6dIgWTVls/line_items?count=2').reply(200, mockLineItems) });
    it('should return line items for an invoices with param', async function() {
      var line_items = await payabbhi.invoices.line_items('invt_srxOZZk6dIgWTVls', {count: 2 });
      assert.equal(line_items.total_count, 2);
      assert.equal(line_items.object, "list");
      assert.equal(line_items.data.length, 2);
    });
  }); // End of #items(param)

  describe('#items(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_srxOZZk6dIgWTVls/line_items?count=2&skip=1&from=15234567&to=15678943').reply(200, mockLineItems) });
    it('should return line items for an invoices with all params', async function() {
      var line_items = await payabbhi.invoices.line_items('invt_srxOZZk6dIgWTVls', {count: 2, skip: 1, from: 15234567, to: 15678943});
      assert.equal(line_items.total_count, 2);
      assert.equal(line_items.object, "list");
      assert.equal(line_items.data.length, 2);
    });
  }); // End of #items(params)


  describe('#payments()', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_UZqFoPLamaZqLFkZ/payments').reply(200, mockPayments) });
    it('should return payments for an invoices', async function() {
      var payments = await payabbhi.invoices.payments('invt_UZqFoPLamaZqLFkZ');
      assert.equal(payments.total_count, 2);
      assert.equal(payments.object, "list");
      assert.equal(payments.data.length, 2);
    });
  }); // End of #payments()

  describe('#payments(param)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_UZqFoPLamaZqLFkZ/payments?count=2').reply(200, mockPayments) });
    it('should return payments for an invoices with param', async function() {
      var payments = await payabbhi.invoices.payments('invt_UZqFoPLamaZqLFkZ', {count: 2 });
      assert.equal(payments.total_count, 2);
      assert.equal(payments.object, "list");
      assert.equal(payments.data.length, 2);
    });
  }); // End of #payments(param)

  describe('#payments(params)', function() {
    beforeEach(() => { nock(API_BASE).get('/invoices/invt_UZqFoPLamaZqLFkZ/payments?count=2&skip=1&from=15234567&to=15678943').reply(200, mockPayments) });
    it('should return payments for an invoices with params', async function() {
      var payments = await payabbhi.invoices.payments('invt_UZqFoPLamaZqLFkZ', {count: 2, skip: 1, from: 15234567, to: 15678943});
      assert.equal(payments.total_count, 2);
      assert.equal(payments.object, "list");
      assert.equal(payments.data.length, 2);
    });
  }); // End of #payments(params)


}); // End of Invoices
