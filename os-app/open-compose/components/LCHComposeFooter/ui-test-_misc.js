import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('LCHComposeFooterMisc', function () {

describe('LCHComposeFooterStorageButton', function testLCHComposeFooterStorageButton () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	before(function () {
		browser.assert.text('#TestLCHComposeFootetDispatchStorage', '0')

		browser.click(LCHComposeFooterStorageButton)
	});
	
	it('has class', function () {
		browser.assert.hasClass(LCHComposeFooterStorageButton, 'OLSKLayoutButtonNoStyle')
		browser.assert.hasClass(LCHComposeFooterStorageButton, 'OLSKLayoutElementTappable')
	});
	
	it('sends LCHComposeFootetDispatchStorage', function () {
		browser.assert.text('#TestLCHComposeFootetDispatchStorage', '1')
	});

});

describe('LCHComposeFooterStorageStatus', function testLCHComposeFooterStorageStatus () {

	before(function() {
		return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?LCHComposeFooterStorageStatus=alfa`);
	});

	it('shows LCHComposeFooterStorageStatus', function () {
		browser.assert.text(OSWRootRemoteStorageError, 'alfa')
	});

});

});