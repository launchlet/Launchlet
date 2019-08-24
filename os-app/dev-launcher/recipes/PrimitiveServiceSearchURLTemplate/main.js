import { LCHPrimitiveURLCallback } from '../PrimitiveURL/main.js';

export const LCHPrimitiveServiceSearchURLTemplateCallback = function(inputData) {
	if (!LCHPrimitiveURLCallback(inputData)) {
		return false;
	}

	if (!inputData.match(/LCHSEARCHTOKEN/i)) {
		return false;
	}

	return true;
};

export const LCHPrimitiveStringCanonicalExampleCallback = function() {
	return 'http://example.com?q=LCHSEARCHTOKEN';
};

export const LCHPrimitiveServiceSearchURLTemplateRecipe = function() {
	return {
		LCHRecipeName: 'Search Service URL Template',
		LCHRecipeCallback: LCHPrimitiveServiceSearchURLTemplateCallback,
		LCHRecipeOutputType: 'Bool',
		LCHRecipeOutputTypeCanonicalExampleCallback: LCHPrimitiveStringCanonicalExampleCallback,
		LCHRecipeSignature: 'ServiceSearchURLTemplate',
		_LCHRecipeNonEquivalenceTypes: 'String,URL',
	};
};
