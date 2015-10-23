var Pundit = {
  ask: function (question, knowledge) {
    return function() {
      return new Promise(function(resolve, reject) {
        if(question.toLowerCase().indexOf('answer to the ultimate question') > 0) {
          resolve(42);
        } else {
          reject( new Error('I did not understand your question.') );
        }
      });
    };
  }
};

module.exports = Pundit;
