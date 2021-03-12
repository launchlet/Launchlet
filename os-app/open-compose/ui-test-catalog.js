const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.only('LCHCompose_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		it('adds item', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});
	
	});

	context('OLSKCatalogDispatchClick', function test_OLSKCatalogDispatchClick () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.elements('.LCHComposeDetail', 0);
		});

		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('selects item', function () {
			browser.assert.elements('.LCHComposeDetail', 1);
		});
	
	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.LCHComposeDetail', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.LCHComposeDetailToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements('.LCHComposeMasterListItem', 0);
			});
		
		});
		
	});

	context('OLSKCatalogDispatchArrow', function test_OLSKCatalogDispatchArrow () {
		
		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});
	
	});

});
