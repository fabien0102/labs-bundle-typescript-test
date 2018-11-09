"use strict";
const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools")

var typeDefs = `
type Query {
  hello: String!
  helloYou(name: String!): String!
}
`
var resolvers = {
    Query: {
      hello: () => "hello world",
      helloYou: (obj,{name}) => `Hello ${name}!`
    }
}
var executableSchema = makeExecutableSchema({typeDefs, resolvers})

// handler
process.stdin.setEncoding("utf8")
process.stdin.on("readable", () => {
    const req = process.stdin.read();
    
    if (req !== null) {
        try {
            req = JSON.parse(req).query
        } catch (e) {/* req is already a query */}
        
        graphql(executableSchema, req)
            .then(res => console.log(res))
            .catch(err => console.log(err.message))   
    }
})
