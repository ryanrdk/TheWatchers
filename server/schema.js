exports.typeDefs = `

type Bootcamper {
    _id: ID
    first_name: String!
    last_name: String!
    username: String!
    email: String!
    campus: String!,
    gender: String!,
    ethnicity: String!,
    active: String!
}

type Query {
    getAllBootcampers: [Bootcamper]
}
`;


/*var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);*/