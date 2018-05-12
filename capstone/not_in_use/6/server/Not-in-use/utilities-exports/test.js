/**
 * Utility methods to handle tests
 *
 * @class TestUtils
 */

/* eslint-disable class-methods-use-this */

const test1Utils = require('./test1');

const testUtils = {
	test(par1) {
		console.log('TestUtils::test, par1 ', par1);
	},
	testa(par1) {
		this.test(par1);
		test1Utils.test1(par1);
	},
	testb(par1) {
		this.test(par1);
		test1Utils.testb(par1);
	}
};

module.exports = testUtils;
