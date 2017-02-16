'use strict';
var seleniumWebTestDriver = require('../src/selenium-web-test-driver');
var assert = require('assert');
const RE_STR_WITH_QUOTE = '["]([^"]+)["]'; //e.g. 'foo bar', "foo bar"

module.exports = {
  name: 'verify script',
  help: 'verify script "<expression>"',
  regExp: new RegExp(`^verify script ${RE_STR_WITH_QUOTE}`),
  /** must return a Promise, so that it can be chained with next command*/
  func: function(expression) {
    let expr = `return !!(${expression})`;
    return seleniumWebTestDriver.driver.wait( function() {
      return seleniumWebTestDriver.driver.executeScript(expr)
        .then(result => result);
    }, seleniumWebTestDriver.config.timeout);
  }
};