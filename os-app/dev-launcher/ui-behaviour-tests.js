import { throws, deepEqual } from 'assert';
import { LCHLauncherThrottleDuration } from './ui-logic.js';


const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher';

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',
	LCHLauncherSubjectPrompt: '.LCHLauncherSubjectPrompt',
	LCHLauncherSubjectPromptHeading: '.LCHLauncherSubjectPrompt .LCHLauncherPromptHeading',
	LCHLauncherSubjectPromptPlaceholder: '.LCHLauncherSubjectPromptPlaceholder',
	LCHLauncherActionPrompt: '.LCHLauncherActionPrompt',
	LCHLauncherActionPromptHeading: '.LCHLauncherActionPrompt .LCHLauncherPromptHeading',

	LCHLauncherListItem: '.LCHLauncherResultListItem',

	LCHLauncherPipeItem: '.LCHLauncherPipeItem',
	LCHLauncherResultList: '.LCHLauncherResultList',
	LCHLauncherResultListItem: '.LCHLauncherResultListItem',
	LCHLauncherSubjectPromptItemSelected: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
	LCHLauncherActionPromptItemSelected: '.LCHLauncherActionPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncherAccess', function testLCHLauncherAccess() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);
			
			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePreview', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 1);

			browser.assert.elements(LCHLauncherListItem, 13);
		});

		it('on filter', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.elements(LCHLauncherListItem, 5);
		});

	});

	context('LCHLauncherModePipe', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
		});
		
		it('on startup', function() {
			browser.assert.elements(LCHLauncherFilterInput, 0);
			browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);

			browser.assert.elements(LCHLauncherListItem, 0);
			browser.assert.elements(LCHLauncherResultList, 0);
			browser.assert.elements(LCHLauncherResultListItem, 0);
			browser.assert.elements(LCHLauncherPipeItem, 0);
		});
		
		context('on keydown', function() {
			
			it('does nothing if no match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, '[');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});
				deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, '[');

				browser.assert.elements(LCHLauncherPipeItem, 0);
			});
			
			it('shows first item if match', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 0);

				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherActionPromptItemSelected, 1);
			});
			
			it('hides list', async function() {
				browser.assert.elements(LCHLauncherResultList, 0);
				browser.assert.elements(LCHLauncherResultListItem, 0);
			});

			it('shows list after throttle', async function() {
				await browser.wait({element: LCHLauncherResultList});

				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			it('selects first list item', async function() {
				await browser.wait({element: '.LCHLauncherResultListItemSelected'});
				browser.assert.hasClass(`${ LCHLauncherResultListItem }:first-child`, 'LCHLauncherResultListItemSelected');
			});

			it('skips throttle on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherResultList});
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			it('skips throttle on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.assert.elements(LCHLauncherPipeItem, 0);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherResultList});
				browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
				browser.assert.elements(LCHLauncherResultList, 1);
				browser.assert.elements(LCHLauncherResultListItem, 5);
			});

			context('MatchStop', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
				});

				it('shows result list', async function() {
					browser.assert.elements(LCHLauncherResultList, 1);
				});

				it('keeps matched results', async function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
				});

				it('passes MatchStop to LCHLauncherPromptHeading', async function() {
					browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 1);
				});

				it('continues to throttle keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'x');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'AXX');
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
				});

				it('removes MatchStop on keydown', async function() {
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
					browser.assert.elements('.LCHLauncherPromptHeadingMatchStop', 0);
				});
				
			});

			context('on Backspace after throttle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');

					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
					await browser.wait({element: LCHLauncherResultList});

					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPromptItemSelected});
				});
				
				it('clears filter ', function() {
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'Subject');
				});
				
				it('keeps results', function() {
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);
				});

			});

			context('on Backspace after clear filter', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherPipeItem});
				});
				
				it('clears results', function() {
					browser.assert.elements(LCHLauncherPipeItem, 0);
				});
				
				it('shows placeholder', function() {
					browser.assert.elements(LCHLauncherSubjectPromptPlaceholder, 1);
				});

			});

			context('on type after inputThrottle', function() {

				before(async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({duration: LCHLauncherThrottleDuration * 2});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
					browser.assert.elements(LCHLauncherSubjectPromptItemSelected, 1);
					browser.assert.elements(LCHLauncherResultList, 1);
					browser.assert.elements(LCHLauncherResultListItem, 5);

					browser.OLSKFireKeyboardEvent(browser.window, 'b');
					await browser.wait({element: LCHLauncherResultList});
				});
				
				it('replaces filter', function() {
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'B');
				});

			});

			context('on Tab', function () {
				
				it('hides open result list', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
					await browser.wait({element: LCHLauncherSubjectPrompt});
					
					browser.assert.elements(LCHLauncherResultList, 0);
				});

			});

		});

	});

	context('shared', function () {

		context('LCHLauncherAccessTestURLFilter', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?LCHLauncherAccessTestURLFilter`);
			});

			it('shows url specific item', async function() {
				browser.fill(LCHLauncherFilterInput, 'LCHLauncherAccessTestURLFilter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherListItem, 1);
			});

		});

	});

});

describe('LCHLauncherLanguage', function testLCHLauncherLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			context('shared', function () {

				before(function() {
					return browser.visit(kDefaultRoutePath);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
				});

				it('on filter', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					browser.assert.text(`${ LCHLauncherListItem }:first-child`, 'Alfa');
				});

				it('skips LCHPageFormulas tasks', async function() {
					await browser.wait({element: LCHLauncherFilterInput});

					browser.assert.input('#LCHLauncherTestInputSingleLine', '');
				});

				context('LCHLauncherAccessTestURLFilter', function () {

					before(function() {
						return browser.visit(`${ kDefaultRoutePath }?LCHLauncherAccessTestURLFilter`);
					});

					it('runs tasks', async function() {
						await browser.wait({element: LCHLauncherFilterInput});

						browser.assert.input('#LCHLauncherTestInputSingleLine', 'zebra');
					});

				});

			});

			context('LCHLauncherModePreview', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModePreview`);
				});

				it('on startup', function() {
					deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderPreview'));
				});

				it('clears filter on Escape', async function() {
					browser.fill(LCHLauncherFilterInput, 'a');
					await browser.wait({element: LCHLauncherListItem});

					browser.assert.input(LCHLauncherFilterInput, 'a');
					
					browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
					await browser.wait({element: LCHLauncherFilterInput});

					browser.assert.input(LCHLauncherFilterInput, '');
				});

			});

			context('LCHLauncherModePipe', function () {

				before(function() {
					return browser.visit(`${ languageCode }${ kDefaultRoutePath }?runMode=kRunModePipe`);
				});

				it('on startup', function() {
					browser.text(LCHLauncherSubjectPromptHeading), uLocalized('LCHLauncherSubjectPromptHeadingText');
					browser.text(LCHLauncherSubjectPromptPlaceholder), uLocalized('LCHLauncherSubjectPromptPlaceholderText');

					browser.text(LCHLauncherActionPromptHeading), uLocalized('LCHLauncherActionPromptHeadingText');
				});

				it('on keydown', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'a');
					await browser.wait({element: LCHLauncherSubjectPromptHeading});

					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, 'A');
				});
				
				it('on keydown Backspace', async function() {
					browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
					await browser.wait({element: LCHLauncherSubjectPromptHeading});
					
					deepEqual(browser.query(LCHLauncherSubjectPromptHeading).textContent, uLocalized('LCHLauncherSubjectPromptHeadingText'));
				});

			});

		});
		
	});
});

describe('LCHLauncherInteraction', function testLCHLauncherInteraction() {

	context('LCHLauncherModeCommit', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
		});
		
		it('shows no items if no filter', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});
		
		it('shows no items if no match', async function() {
			browser.fill(LCHLauncherFilterInput, 'alfabravo');
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('shows items if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.elements(LCHLauncherListItem, 5);
		});

		it('selects first item', async function() {
			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'LCHLauncherResultListItemSelected');
		});

		it.skip('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
		});

		it('does not run item on select', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[0], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Alfa');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModeCommit`);
			});

			it('selects next item on ArrowDown', async function() {
				browser.fill(LCHLauncherFilterInput, 'a');
				await browser.wait({element: LCHLauncherListItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
			});

			it('selects previous item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[0], 'LCHLauncherResultListItemSelected');
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePreview', function () {

		before(function() {
			return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
		});

		it('selects no items', async function() {
			browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		});

		it.skip('selects item on mouseover', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'mouseover');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.hasClass(browser.queryAll(LCHLauncherListItem)[1], 'LCHLauncherResultListItemSelected');
		});

		it('does not run item on mouseover', async function() {
			browser.assert.input('textarea', '');
		});

		it('runs first item if filter and match', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({element: LCHLauncherListItem});
			
			browser.assert.input('textarea', 'Alfa');
		});

		it('runs item and closes on click', async function() {
			browser.fire(browser.queryAll(LCHLauncherListItem)[1], 'click');
			await browser.wait({element: LCHLauncherListItem});

			browser.assert.input('textarea', 'Bravo');

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});


		context('shortcuts', function () {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePreview`);
			});

			it('runs item on ArrowDown', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Alfa');
			});

			it('runs item on ArrowUp', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.input('textarea', 'Hello');
			});

			it('closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherListItem});

				browser.assert.elements(LCHLauncherFilterInput, 0);
			});

		});

	});

	context('LCHLauncherModePipe', function () {
		
		context('on startup', function() {

			before(function() {
				return browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);
			});
			
			it('selects LCHLauncherSubjectPrompt', function() {
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing on Enter if no input', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.assert.elements(LCHLauncherSubjectPrompt, 1);
			});

			it('runs item and closes on Enter', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
				await browser.wait({element: LCHLauncherSubjectPrompt});

				browser.assert.elements(LCHLauncherSubjectPrompt, 0);
				
				browser.assert.input('textarea', 'Alfa');
			});

		});
		
		context('active prompt', function() {

			before(async function() {
				await browser.visit(`${ kDefaultRoutePath }?runMode=kRunModePipe`);

				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherResultList});
			});
			
			it('updates on click', async function() {
				browser.click(LCHLauncherActionPrompt);
				await browser.wait({element: LCHLauncherActionPrompt});
				
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});

			it('updates on Tab', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
				await browser.wait({element: LCHLauncherSubjectPrompt});
				
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			});

			it('updates on Shift Tab', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
					shiftKey: true,
				});
				await browser.wait({element: LCHLauncherSubjectPrompt});
				
				browser.assert.hasClass(LCHLauncherActionPrompt, 'LCHLauncherPromptSelected');
			});

			it('does nothing if no subject', async function() {
				browser.click(LCHLauncherSubjectPrompt);
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
				await browser.wait({element: LCHLauncherPipeItem});

				browser.click(LCHLauncherActionPrompt);
				await browser.wait({element: LCHLauncherActionPrompt});
				
				browser.assert.hasClass(LCHLauncherSubjectPrompt, 'LCHLauncherPromptSelected');
			})

		});

		context('MatchStop', function() {

			before(async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'a');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.hasNoClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
			});

			it('adds class', async function() {
				browser.OLSKFireKeyboardEvent(browser.window, 'x');
				await browser.wait({element: LCHLauncherSubjectPromptHeading});

				browser.assert.hasClass(LCHLauncherSubjectPromptHeading, 'LCHLauncherPromptHeadingMatchStop');
			});
			
		});

	});
		
	context('shared', function () {

		before(function() {
			return browser.visit(kDefaultRoutePath);
		});

		it('closes on Escape', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			await browser.wait({element: LCHLauncherFilterInput});

			browser.assert.elements(LCHLauncherFilterInput, 0);
		});

	});

});
