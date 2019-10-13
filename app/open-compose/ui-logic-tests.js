import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHComposeFilterFunction', function testLCHComposeFilterFunction() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeFilterFunction(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHComposeFilterFunction('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if LCHDocumentCallback match', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentCallback () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('bravo')({
				LCHDocumentName: 'alfa',
			}), false);
		});

		it('returns true', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentName: 'alfa',
			}), true);
		});

		it('matches partial', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alf')({
				LCHDocumentName: 'alfa',
			}), true);
		});

		it('matches case insensitive', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('ALF')({
				LCHDocumentName: 'alfa',
			}), true);
		});

		it('matches LCHDocumentSignature', function() {
			deepEqual(mainModule.LCHComposeFilterFunction('alfa')({
				LCHDocumentSignature: 'alfa',
			}), true);
		});

	});

});

describe('LCHComposeSort', function testLCHComposeSort() {

	it('sorts by LCHDocumentModificationDate descending', function() {
		let item1 = {
			LCHDocumentModificationDate: new Date(0),
		};
		let item2 = {
			LCHDocumentModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeSort), [item2, item1]);
	});

	it('sorts by LCHDocumentCreationDate descending if no LCHDocumentModificationDate', function() {
		let item1 = {
			LCHDocumentCreationDate: new Date(0),
		};
		let item2 = {
			LCHDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mainModule.LCHComposeSort), [item2, item1]);
	});

});
