const kDefaultRoute = require('../../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};
	
describe(`LCHSubjectContainerShowContents_Localize-${ languageCode }`, function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
			LCHOptionMode: 'LCHModePipe',
		});
	});

	before(function() {
		browser.OLSKFireKeyboardEvent(browser.window, 'LCHActiveDocumentFocusElements');
	});

	it('localizes LCHLauncherPipeItemTitle', function() {
		browser.assert.text(`${ LCHLauncherActionPromptItemSelected } ${ LCHLauncherPipeItemTitle }`, uLocalized('LCHStandardRecipeNames').LCHSubjectContainerShowContents);
	});

});

});
