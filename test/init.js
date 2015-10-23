var assert = require('assert');
var Pundit = require('../pundit');

describe('Pundit', function() {
  it('should be requireable and answer a simple question', function() {

    var q = 'What is the Answer to The Ultimate Question of Life, '+
            'the Universe, and Everything?';
    var wisdom = Pundit.ask(q);

    wisdom().then(function(answer) {
      assert(answer === 42);
    });
  });
});
