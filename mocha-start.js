(function OLSKMochaBrowser() {
	if (process.env.OLSK_TESTING_BEHAVIOUR !== 'true') {
		return;
	}

	const Browser = require('zombie');

	Browser.localhost('loc.tests', 3000);
	
	Browser.prototype.OLSKFireKeyboardEvent = function(target, keyCode, eventOptions = {}) {
		const event = this.window.document.createEvent('HTMLEvents');
		event.initEvent('keydown', true, true);
		event.which = event.keyCode = event.key = event.code = keyCode;

		target = typeof target === 'string' ? this.query(target) : target;

		if (!target) {
			throw new Error('no target');
		}

		target.dispatchEvent(Object.assign(event, eventOptions));

		return this._wait(null);
	};

	Browser.extend(function(browser) {
	  browser.on('confirm', function(dialog) {
	    return browser.OLSKConfirmCallback ? browser.OLSKConfirmCallback(dialog) : dialog;
	  });
	});
	
	Browser.prototype.OLSKConfirm = async function(param1, param2) {
		let browser = this;
		return await new Promise(async function (resolve, reject) {
			browser.OLSKConfirmCallback = function (dialog) {
				delete browser.OLSKConfirmCallback;
				return resolve(param2 ? param2(dialog) : dialog);
			};

			param1();
		});
	};

	global.OLSKBrowser = Browser;

	global.browser = new OLSKBrowser();
})();

let languageDictionary = {};
(function OLSKMochaLocalizedStrings() {
	if (process.env.OLSK_TESTING_BEHAVIOUR !== 'true') {
		return;
	}

	const pathPackage = require('path');
	const OLSKInternational = require('OLSKInternational');
	const OLSKString = require('OLSKString');

	let baseDirectory = pathPackage.join(__dirname, 'os-app');
	languageDictionary = require('glob').sync('*i18n*.y*(a)ml', {
	  matchBase: true,
	  cwd: baseDirectory,
	}).filter(function(e) {
	  return OLSKInternational.OLSKInternationalIsTranslationFileBasename(pathPackage.basename(e));
	}).map(function (e) {
		return pathPackage.join(baseDirectory, e);
	}).reduce(function(coll, item) {
		let languageID = OLSKInternational.OLSKInternationalLanguageID(pathPackage.basename(item));

		return (coll[languageID] = Object.assign(coll[languageID] || {}, require('js-yaml').safeLoad(require('fs').readFileSync(item, 'utf8')))) && coll;
	}, {});

	global.OLSKTestingLocalized = function(translationConstant, languageCode) {
		return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, languageDictionary[languageCode]).replace('TRANSLATION_MISSING', '');
	};

	global.OLSKTestingStringWithFormat = OLSKString.OLSKStringWithFormat;
})();

(function OLSKMochaPreprocess() {
	const fs = require('fs');
	const oldRequire = require('olsk-rollup-plugin-localize')()._OLSKRollupI18NReplaceInternationalizationToken;
	const replaceFunctions = [
		require('OLSKTesting')._OLSKTestingMochaReplaceES6Import,
		function (inputData) {
			return (oldRequire({
				code: inputData,
			}, languageDictionary) || {
				code: inputData,
			}).code;
		},
	];

	require.extensions['.js'] = function(module, filename) {
		if (filename.match('OLSKRollup')) {
			return;
		};

		try {
			return module._compile(replaceFunctions.reduce(function (coll, item) {
				return item(coll);
			}, fs.readFileSync(filename, 'utf-8')), filename);
		} catch (err) {
			// console.log(code); // eslint-disable-line no-console
			throw err;
		}
	};
})();


const LCHStorageModule = require('./os-app/_shared/LCHStorageModule/main.js');
const LCHDocumentStorage = require('./os-app/_shared/LCHDocument/storage.js');
const LCHSettingStorage = require('./os-app/_shared/LCHSetting/storage.js');

(function LCHMochaStorage() {
	const uSerial = function (inputData) {
		return inputData.reduce(async function (coll, e) {
			return e.then(Array.prototype.concat.bind(await coll));
		}, Promise.resolve([]));
	};

	before(function(done) {
		global.LCHTestingStorageClient = require('./os-app/_shared/LCHStorageClient/main.js').LCHStorageClientForModules([
				LCHStorageModule.LCHStorageModule([
					LCHDocumentStorage.LCHDocumentStorage,
					LCHSettingStorage.LCHSettingStorage,
				].map(function (e) {
					return {
						LCHCollectionStorageGenerator: e,
						LCHCollectionChangeDelegate: null,
					};
				}))
			]);

		done();
	});

	beforeEach(async function() {
		await uSerial([
			'lch_documents',
			'lch_settings',
		].map(async function (e) {
			return await Promise.all(Object.keys(await global.LCHTestingStorageClient.launchlet[e].listObjects()).map(global.LCHTestingStorageClient.launchlet[e].deleteObject));
		}));
	});
})();

(function OLSKMochaErrors() {
	process.on('unhandledRejection', () => {
		// console.log('Unhandledd Rejection at:', arguments)
		// Recommended: send the information to sentry.io
		// or whatever crash reporting service you use
	});
})();
