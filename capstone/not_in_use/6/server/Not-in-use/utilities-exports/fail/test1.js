/**
 * Utility methods to handle tests
 *
 * @class TestUtils
 */

/* eslint-disable class-methods-use-this */

const TestUtils = require('./test');

const testUtils = new TestUtils();

class Test1Utils {
	test1(par1) {
		console.log('Test1Utils::test1, par1 ', par1);
	}
	testb(par1) {
		console.log('Test1Utils::testb, par1 ', par1);
		testUtils.test(par1);
	}
}

module.exports = Test1Utils;
