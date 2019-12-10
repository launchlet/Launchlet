const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('LCHVitrinePageColoursRandomizeRecipe', function testLCHVitrinePageColoursRandomizeRecipe() {

	it('returns LCHRecipe', async function() {
		deepEqual(mainModule.LCHVitrinePageColoursRandomizeRecipe(), {
			LCHRecipeCallback: mainModule.LCHVitrinePageColoursRandomizeCallback,
			LCHRecipeSignature: 'LCHVitrinePageColoursRandomize',
		});
	});

});