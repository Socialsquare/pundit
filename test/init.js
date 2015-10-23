var assert = require('assert');
var Pundit = require('../pundit').config('http://localhost:3000/');

describe('Pundit', function() {
  it('should be requireable and answer a simple question', function(done) {
    this.timeout(500);

    var q = 'What is the Answer to The Ultimate Question of Life, '+
            'the Universe, and Everything?';
    var knowledge = [
      { args: [], returns: 42 }
    ];

    var wisdom = Pundit.ask(q, knowledge);

    wisdom().then(function(answer) {
      assert(answer === 42);
      done();
    });
  });
});
