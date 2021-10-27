const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherThrottle', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			StubRecipes: uStubStringify(uStubTwoItems()),
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function () {
		browser.OLSKFireKeyboardEvent(browser.window, 'a');
	});

	context('Tab', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});

		it('cancels throttle', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('DotMode', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, '.');
		});
		
		it('cancels throttle', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});
		
		after(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
	
	});

	context('ArrowDown', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it.skip('skips throttle', function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});

		after(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		})

	});

	context('ArrowUp', function () {

		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('skips throttle', function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});
	
	});

});
