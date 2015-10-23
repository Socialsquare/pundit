var request = require('request');

var defaultOptions = {
  brainLocation: 'https://pundit.socialsquare.dk/'
};

function fetchWisdom(question, knowledge) {
  var wisdomPromise = new Promise(function(resolve, reject) {
    return request({
      url: Pundit.options.brainLocation + 'wisdom',
      body: { question, knowledge },
      json: true
    }, function (error, response, body) {
      if(response.statusCode === 200) {
        if(body.code) {
          resolve(new Function(body.code));
        } else {
          reject(new Error('The response did not contain code.'));
        }
      } else  {
        reject(error || new Error(body.error) || new Error(body));
      }
    });
  });

  return function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
      return wisdomPromise.then(function(wisdom) {
        if(typeof(wisdom) === 'function') {
          var value = wisdom.apply(null, arguments);
        } else {
          wisdom = JSON.stringify(wisdom);
          var err = new Error('Wisdom returned was not a function, got '+wisdom);
          reject(err);
        }
        resolve(value);
      }, reject);
    });
    /*
    return new Promise(function(resolve, reject) {
      if(question.toLowerCase().indexOf('answer to the ultimate question') > 0) {
        resolve(42);
      } else {
        reject( new Error('I did not understand your question.') );
      }
    });
    */
  }
}

var Pundit = {
  options: defaultOptions,
  config: function(options) {
    if(typeof(options) === 'string') {
      options = {
        brainLocation: options
      };
    }
    this.options.brainLocation = options.brainLocation || this.options.brainLocation;
    return this;
  },
  ask: function(question, knowledge) {
    // TODO: Implement a local brain-cache.
    return fetchWisdom(question, knowledge);
  }
};

module.exports = Pundit;
