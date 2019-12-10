const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrineCopyPageInfoRecipe', function testLCHVitrineCopyPageInfoRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrineCopyPageInfoRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrineCopyPageInfoCallback,
			LCHRecipeSignature: 'LCHVitrineCopyPageInfo',
		});
	});

});