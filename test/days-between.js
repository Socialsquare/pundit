var assert = require('assert');
var Pundit = require('../pundit').config('http://localhost:3000/');

describe('Pundit', function() {
  it('should know how to calculate workdays between days', function() {

    var daysBetween = Pundit.ask('How many workdays (Mon-Fri) are between these dates?', [
      { args: ['20-10-2015', '23-10-2015'], return: 3 },
      { args: [new Date(2015, 10, 20), new Date(2015, 10, 23)], return: 3 },
      { args: [new Date(2015, 10, 20), undefined], return: null },
      { args: [undefined, new Date(2015, 10, 23)], return: null },
      { args: [], return: new Error('You have to specify two dates as arguments.') }
    ]);

    return daysBetween(new Date(2015, 10, 20), new Date(2015, 10, 23))
    .then(function(answer) {
      assert.equal(answer, 3);
    });
  });
});