const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguageCodes[0]);
};

describe('LCHLauncherMisc_Pipe', function test_LCHLauncherMisc_Pipe() {	

	describe('Enter', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			browser.assert.input('#TestRecipeOutput', '');	
		});

		it('assert callbacks count 0')

		context('input not valid', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs no callback', function() {
				browser.assert.input('#TestRecipeOutput', '');
			});
		
		});

		context('input valid', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('runs callback', function() {
				browser.assert.input('#TestRecipeOutput', 'alfa');
			});

			it('hides LCHLauncher', function() {
				browser.assert.elements(LCHLauncher, 0);
			});

			it('! runs callback once', function() {
				browser.assert.elements('.TestLauncherDidFinish', 1);
			});
		
		});

	});

	describe('keydown', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function () {
			browser.assert.elements(LCHLauncher)

			browser.evaluate(`let item = document.createElement('input'); item.classList.add('TestKeydownBubble'); document.body.appendChild(item); item.focus();`)
			// browser.assert.hasFocus('.TestKeydownBubble')
			
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('hides LCHLauncherSubjectPromptPlaceholder', function () {
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);
		});

		it('shows first subject match', function() {
			browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
		});

		it('shows first subject match', function() {
			browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
		});
	
		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		context('throttle', function () {

			before(function () {
				return browser.wait({ element: '.OLSKResultsList' });
			});
			
			it('shows OLSKResultsList', function() {
				browser.assert.elements('.OLSKResultsList', 1);
			});

			it('selects first list item', function() {
				browser.assert.hasClass(`${ '.OLSKResultsListItem' }:first-child`, 'OLSKResultsListItemSelected');
			});
		
		});

		context('after throttle', function() {

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

				return browser.OLSKFireKeyboardEvent(browser.window, 'b');
			});

			before(function () {
				browser.assert.text(LCHLauncherActionPromptHeading, 'B');

				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');

				browser.OLSKFireKeyboardEvent(browser.window, 'c');
			});
			
			it('sets LCHLauncherSubjectPromptHeading', function() {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'C');
			});
			
			it('sets LCHLauncherActionPromptHeading', function() {
				browser.assert.text(LCHLauncherActionPromptHeading, uLocalized('LCHLauncherActionPromptHeadingText'));
			});

		});
			
		it('prevents keydown from bubbling', function() {
			browser.assert.input('.TestKeydownBubble', '');
		});

	});

	describe('MatchStop', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});
			
		before(function() {
			browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'x');
		});

		it('classes LCHLauncherPromptHeadingMatchStop', function() {
			browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
		});

		it('shows OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});

		context('throttle', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'x');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'AXX');
			});

			it('shows OLSKResultsList', function() {
				browser.assert.elements('.OLSKResultsList', 1);
			});
		
		});

		context('after throttle', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
			});

			it('sets filter', function () {
				browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
			});

			it('classes LCHLauncherPromptHeadingMatchStop', function() {
				browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
			});

			it('hides OLSKResultsList', function() {
				browser.assert.elements('.OLSKResultsList', 0);
			});
		
		});
		
	});

	describe('SubjectContainer', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'd');
		});
			
		before(function() {
			browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, 'Active Document Focus Elements'); // #localize
		});

		it('shows action', function() {
			browser.assert.text(LCHLauncherActionPromptItemSelected, 'Show Contents'); // #localize
		});

		context('execute', function () {
			
			before(function() {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			it('reloads subjects', async function() {
				browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemTitle}`, 'TestLauncherInvoke');
			});
		
		});
		
	});

	describe('keydown', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		it('sets LCHLauncherSubjectPromptHeading', function() {
			browser.assert.text(LCHLauncherSubjectPromptHeading, 'A');
		});
		
	});

	describe('Escape', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		before(function() {
			browser.assert.elements('.OLSKResultsList', 1);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides OLSKResultsList', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('hides LCHLauncher', function() {
			browser.assert.elements(LCHLauncher, 0);
		});

	});

	context('Tab', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				StubRecipes: uStubStringify(uStubTwoItems()),
				LCHOptionMode: 'LCHModePipe',
			});
		});

		before(function() {
			return browser.OLSKFireKeyboardEvent(browser.window, 'a');
		});

		before(function() {
			browser.assert.elements('.OLSKResultsList', 1);
			return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
		});
		
		it('hides open result list', function() {
			browser.assert.elements('.OLSKResultsList', 0);
		});

	});
	
});
