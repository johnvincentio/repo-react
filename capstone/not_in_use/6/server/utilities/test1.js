/**
 * Utility methods to handle tests
 *
 * @class TestUtils
 */

/* eslint-disable class-methods-use-this */

const testUtils = require('./test');

const test1Utils = {
	test1(par1) {
		console.log('Test1Utils::test1, par1 ', par1);
	},
	testb(par1) {
		console.log('Test1Utils::testb, par1 ', par1);
		testUtils.test(par1);
	}
};

module.exports = test1Utils;
