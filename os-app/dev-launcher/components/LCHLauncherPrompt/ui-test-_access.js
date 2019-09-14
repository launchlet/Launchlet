import { deepEqual } from 'assert';

const kDefaultRoutePath = '/stubs/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherPromptItemSelected = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe('LCHLauncherPromptElement', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPrompt, 1);

		browser.assert.elements(LCHLauncherPromptItemSelected, 0);

		browser.assert.elements(LCHLauncherResultList, 0);
	});

	it('on set single', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 1);
	});
	
	it('on set multiple', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 3);
	});
	
	it('on set zero', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 0);
	});
	
	it('on ResultsHidden', async function() {
		browser.check('#LCHLauncherPromptTestSetResultsHidden');
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(LCHLauncherResultList, 0);
	});
	
	it('on set ItemSelected', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		
		browser.assert.elements(LCHLauncherPromptItemSelected, 1);
	});
	
	it('on ItemSelectedHidden', async function() {
		await browser.check('#LCHLauncherPromptTestSetItemSelectedHidden');

		browser.assert.elements(LCHLauncherPromptItemSelected, 0);
	});

});