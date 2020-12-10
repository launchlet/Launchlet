const { rejects, throws, deepEqual } = require('assert');

const mod = require('./storage.js').default;

describe('LCHDocumentStorageCollectionName', function test_LCHDocumentStorageCollectionName() {

	it('returns string', function() {
		deepEqual(mod.LCHDocumentStorageCollectionName(), 'lch_documents');
	});

});

describe('LCHDocumentStorageCollectionPath', function test_LCHDocumentStorageCollectionPath() {

	it('returns string', function() {
		deepEqual(mod.LCHDocumentStorageCollectionPath(), mod.LCHDocumentStorageCollectionName() + '/');
	});

});

describe('LCHDocumentStorageObjectPath', function test_LCHDocumentStorageObjectPath() {

	it('throws error if not valid', function() {
		throws(function() {
			mod.LCHDocumentStorageObjectPath({});
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = StubDocumentObjectValid();
		deepEqual(mod.LCHDocumentStorageObjectPath(item), mod.LCHDocumentStorageCollectionPath() + item.LCHDocumentID);
	});

});

describe('LCHDocumentStorageMatch', function test_LCHDocumentStorageMatch() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHDocumentStorageMatch(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if no LCHDocumentStorageCollectionPath', function() {
		const item = mod.LCHDocumentStorageCollectionPath();
		deepEqual(mod.LCHDocumentStorageMatch(mod.LCHDocumentStorageObjectPath(StubDocumentObjectValid()).replace(item, item.slice(0, -2) + '/')), false);
	});

	it('returns false if no LCHDocumentStorageObjectPath', function() {
		deepEqual(mod.LCHDocumentStorageMatch(mod.LCHDocumentStorageObjectPath(StubDocumentObjectValid()) + '/'), false);
	});

	it('returns true', function() {
		deepEqual(mod.LCHDocumentStorageMatch(mod.LCHDocumentStorageObjectPath(StubDocumentObjectValid())), true);
	});

});

describe('LCHDocumentStorageWrite', function test_LCHDocumentStorageWrite() {

	it('rejects if not object', async function() {
		await rejects(mod.LCHDocumentStorageWrite(LCHTestingStorageClient, null), /LCHErrorInputNotValid/);
	});

	it('returns object with LCHErrors if not valid', async function() {
		deepEqual((await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, Object.assign(StubDocumentObjectValid(), {
			LCHDocumentID: null,
		}))).LCHErrors, {
			LCHDocumentID: [
				'LCHErrorNotString',
			],
		});
	});

	it('returns input', async function () {
		const item = StubDocumentObjectValid();

		deepEqual(await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, item) === item, true);
	});

	it('leaves input unmodified', async function () {
		deepEqual(await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid()), StubDocumentObjectValid());
	});

});

describe('LCHDocumentStorageList', function test_LCHDocumentStorageList() {

	it('returns empty array if none', async function() {
		deepEqual(await mod.LCHDocumentStorageList(LCHTestingStorageClient), {});
	});

	it('returns existing LCHDocuments', async function() {
		let item = await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid());
		deepEqual(Object.values(await mod.LCHDocumentStorageList(LCHTestingStorageClient)), [item]);
		deepEqual(Object.keys(await mod.LCHDocumentStorageList(LCHTestingStorageClient)), [item.LCHDocumentID]);
	});

});

describe('LCHDocumentStorageDelete', function test_LCHDocumentStorageDelete() {

	it('rejects if not string', async function() {
		await rejects(mod.LCHDocumentStorageDelete(LCHTestingStorageClient, 1), /LCHErrorInputNotValid/);
	});

	it('returns statusCode', async function() {
		deepEqual(await mod.LCHDocumentStorageDelete(LCHTestingStorageClient, (await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid())).LCHDocumentID), {
			statusCode: 200,
		});
	});

	it('deletes LCHDocument', async function() {
		await mod.LCHDocumentStorageDelete(LCHTestingStorageClient, (await mod.LCHDocumentStorageWrite(LCHTestingStorageClient, StubDocumentObjectValid())).LCHDocumentID);
		deepEqual(await mod.LCHDocumentStorageList(LCHTestingStorageClient), {});
	});

});

