'use strict';

let graphql = require('graphql'),
  relay = require('graphql-relay'),

  types = require('./types'),
  rootQuery = require('./queries'),
  rootMutation = require('./mutations');


const nodeDefs = relay.nodeDefinitions(
  (globalId) => {
    console.log('OBJ ID', globalId);
    const obj = relay.fromGlobalId(globalId);

    console.log('OBJ', obj);

    if (obj.type === 'Faction') {
      //return getFaction(obj.id);
    } else {
      return null;
    }
  },
  (obj) => {
    console.log('get type:', obj);
    return {};
    //return obj.ships ? factionType : shipType;
  }
);

types(nodeDefs.nodeInterface);

const Schema = new graphql.GraphQLSchema({
  //!important: rootQuery and rootMutation must be executed after graphql__nodeInterface definition
  query: rootQuery(nodeDefs.nodeField),
  mutation: rootMutation()
});
module.exports = Schema;
