import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherResultList';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe.only('LCHLauncherResultListDiscovery', function testLCHLauncherResultListDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherResultList, 1);

		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});
	
	it('on set single', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');

		browser.assert.elements(LCHLauncherResultListItem, 1);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');

		browser.assert.elements(LCHLauncherResultListItem, 2);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsZero');

		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});

});

describe.only('LCHLauncherResultListLanguage', function testLCHLauncherResultListLanguage() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text(LCHLauncherResultListEmpty, 'TestItemsZero');
	});

});