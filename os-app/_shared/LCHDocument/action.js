import * as LCHDocumentMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const LCHDocumentActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await LCHDocumentMetal.LCHDocumentMetalWrite(storageClient, Object.assign(inputData, {
		LCHDocumentID: uniqueID(),
		LCHDocumentCreationDate: creationDate,
		LCHDocumentModificationDate: creationDate,
	}));
};

export const LCHDocumentActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('LCHErrorInputNotValid'));
	}

	return await LCHDocumentMetal.LCHDocumentMetalWrite(storageClient, Object.assign(inputData, {
		LCHDocumentModificationDate: new Date(),
	}));
};

export const LCHDocumentActionDelete = async function(storageClient, inputData) {
	return await LCHDocumentMetal.LCHDocumentMetalDelete(storageClient, inputData);
};

export const LCHDocumentActionList = async function(storageClient) {
	return Object.values(await LCHDocumentMetal.LCHDocumentMetalList(storageClient));
};
