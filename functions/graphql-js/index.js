"use strict";
const { graphql, buildSchema } = require("graphql");

// schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// resolver
const root = { hello: () => "Hello world! from OpenFaaS" };

module.exports = (context, callback) => {
  // here we call the graphql engine, the query is expected to come in
  // the context parameter
  graphql(schema, context, root)
    .then(response => {
      callback(undefined, response);
    })
    .catch(err => {
      callback(err, undefined);
    });
};
