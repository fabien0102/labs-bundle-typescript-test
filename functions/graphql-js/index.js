"use strict";
const { graphql, buildSchema } = require("graphql");
const getStdin = require("get-stdin");

// schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// resolver
const root = { hello: () => "Hello world! from OpenFaaS" };

// handler
getStdin()
    .then(req => graphql(schema, req, root))
    .catch(console.error.bind(console))
