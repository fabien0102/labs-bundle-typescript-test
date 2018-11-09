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


// handler
process.stdin.setEncoding("utf8")
process.stdin.on("readable", () => {
    const req = process.stdin.read();
    graphql(schema, req, root)
        .then(process.stdout.write)
        .catch(process.stout.write)
})
