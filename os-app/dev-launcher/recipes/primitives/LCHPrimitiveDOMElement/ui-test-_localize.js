const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};
	
describe('DOMElement_Localize-' + OLSKRoutingLanguage, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
			LCHOptionMode: 'LCHModePipe',
			StubRecipes: uStubStringify([{
				LCHRecipeName: 'alfa',
				LCHRecipeCallback: function () {},
				LCHRecipeOutputType: 'DOMElement',
			}]),
		});
	});

	before(function() {
		browser.OLSKFireKeyboardEvent(browser.window, 'alfa');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text(`${ LCHLauncherSubjectPromptItemSelected } ${ LCHLauncherPipeItemSubtitle }`, uLocalized('LCHStandardRecipeNames').DOMElement);
	});
	
});

});
