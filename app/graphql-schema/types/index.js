'use strict';

module.exports = (nodeInterface) => {
  //This is like a hack which allows other parts of app use types only after their definition
  //Require only types from other files, not types/<name>
  module.exports.user = require('./user.type')(nodeInterface);
};
