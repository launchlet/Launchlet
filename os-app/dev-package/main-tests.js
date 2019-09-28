import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';
import { LCHLauncherModeCommit, LCHLauncherModePreview, LCHLauncherModePipe } from '../dev-launcher/ui-logic.js';

const kTesting = {
	StubAppClass: function() {
		return function Alfa (type) {
			this.$destroy = function () {};
		};
	},
};

describe('LRTModeCommit', function testLRTModeCommit() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModeCommit, LCHLauncherModeCommit());
	});

});

describe('LRTModePreview', function testLRTModePreview() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModePreview, LCHLauncherModePreview());
	});

});

describe('LRTModePipe', function testLRTModePipe() {

	it('sets value', function() {
		deepEqual(mainModule.LRTModePipe, LCHLauncherModePipe());
	});

});

describe('instanceCreate', function testinstanceCreate() {

	before(function () {
		mainModule.AppClass(kTesting.StubAppClass());
	});

	after(function () {
		mainModule.instanceDestroy();
	});

	it('returns undefined', function() {
		deepEqual(mainModule.instanceCreate(), undefined);
	});

	context('param1', function () {

		it('throws error if not array', function() {
			throws(function() {
				mainModule.instanceCreate({});
			}, /LCHErrorInputNotArray/);
		});

	});

	context('param2', function () {

		it('throws error if not object', function() {
			throws(function() {
				mainModule.instanceCreate([], 'alfa');
			}, /LCHErrorInputNotObject/);
		});		

		context('LRTOptionMode', function () {

			it('throws error if not valid', function() {
				throws(function() {
					mainModule.instanceCreate([], {
						LRTOptionMode: function () {
							return 'alfa';
						},
					});
				}, /LCHErrorInputModeNotValid/);
			});

			it('returns undefined', function() {
				deepEqual(mainModule.instanceCreate([], {
					LRTOptionMode: mainModule.LRTModePreview,
				}), undefined);
			});

		});		

		context('LRTCompletionHandler', function () {

			it('throws error if not function', function() {
				throws(function() {
					mainModule.instanceCreate([], {
						LRTCompletionHandler: 'alfa',
					});
				}, /LCHErrorInputNotFunction/);
			});

			it('returns undefined', function() {
				deepEqual(mainModule.instanceCreate([], {
					LRTCompletionHandler () {},
				}), undefined);
			});

		});

	});

});

describe('instanceExists', function testinstanceExists() {

	before(function () {
		mainModule.AppClass(kTesting.StubAppClass());
	});

	it('returns false', function() {
		deepEqual(mainModule.instanceExists(), false);
	});

	it('returns true after instanceCreate', function() {
		mainModule.instanceCreate();
		deepEqual(mainModule.instanceExists(), true);
	});

	it('returns false after instanceDestroy', function() {
		mainModule.instanceCreate();
		mainModule.instanceDestroy();
		deepEqual(mainModule.instanceExists(), false);
	});

});
