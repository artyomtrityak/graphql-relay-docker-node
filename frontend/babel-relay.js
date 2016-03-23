'use strict';

var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../scripts/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
