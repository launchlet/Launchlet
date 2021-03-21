exports.OLSKControllerUseLivereload = function() {
	return process.env.NODE_ENV === 'development';
};

function OLSKRouteFunction (req, res, next) {
	const { LCHGuideExampleFormatted, LCHGuideExampleQuoted, LCHGuideExampleTemplate } = require('./ui-logic.js');
	function _LCHGuideExampleTemplate(inputData) {
		return LCHGuideExampleTemplate(LCHGuideExampleQuoted(LCHGuideExampleFormatted(inputData), function (inputData) {
			return res.locals.OLSKLocalized('LCHGuideDocumentFields')[inputData];
		}))
	};

	return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
		LCHGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), Object.assign({
			LCHGuideTokenExampleCommandV1: _LCHGuideExampleTemplate({
				LCHDocumentName: 'Say Hello',
				LCHDocumentCallbackBody: `alert('Hello')`,
			}),
			LCHGuideTokenExampleProcedure: _LCHGuideExampleTemplate({
				LCHDocumentSignature: 'Greet',
				LCHDocumentCallbackArgs: 'message',
				LCHDocumentCallbackBody: `alert(message)`,
			}),
			LCHGuideTokenExampleCommandV2: _LCHGuideExampleTemplate({
				LCHDocumentName: 'Say Hello',
				LCHDocumentCallbackBody: `this.api.Greet('Hello')`,
			}),
			LCHGuideTokenExampleSubject: _LCHGuideExampleTemplate({
				LCHDocumentName: 'Salutation',
				LCHDocumentOutputType: 'String',
				LCHDocumentCallbackBody: `return 'Yo'`,
			}),
			LCHGuideTokenExampleAction: _LCHGuideExampleTemplate({
				LCHDocumentName: 'Shout',
				LCHDocumentInputTypes: 'String',
				LCHDocumentCallbackArgs: 'message',
				LCHDocumentCallbackBody: 'alert(message.toUppercase())',
			}),
			LCHGuideTokenExamplePageRecipe: require('./ui-logic.js').LCHGuideStringify({
				LCHRecipeName: 'Say Hello',
				LCHRecipeCallback: 'LCHGuideTokenExamplePageRecipeFunction',
			}),
			'"LCHGuideTokenExamplePageRecipeFunction"': (function () {
  alert('Hello');
 }).toString(),
		}, res.locals.OLSKLocalized('LCHGuideDocumentFields'))),
		OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
	});
};

exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteSignature: 'LCHGuideRoute',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction,
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
