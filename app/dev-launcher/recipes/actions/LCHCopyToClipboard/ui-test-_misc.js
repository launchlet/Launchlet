import { deepEqual } from 'assert';

const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHCopyToClipboardButton: '.LCHCopyToClipboardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHCopyToClipboard_Misc', function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {
					return this.api.LCHCopyToClipboard('bravo');
				},
			}]),
		}));
	});

	before(function() {
		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

	before(function() {
		return browser.fill(LCHLauncherFilterInput, 'alfa');
	});

	before(function() {
		browser.click(LCHLauncherListItem);
	});

	it('focuses LCHCopyToClipboardButton', function() {
		deepEqual(browser.document.activeElement, browser.query(LCHCopyToClipboardButton));
	});

	context('click', function () {

		before(function () {
			return browser.pressButton(LCHCopyToClipboardButton);
		});

		it('hides LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 0);
		});

	});

});
