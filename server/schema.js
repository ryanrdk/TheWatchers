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

type Day {
    _id: ID
    Day: String!
    Username: String!
    User_id: String!
    Campus: String!
    Final_mark: Int
    Mark1: Int
    Comment1: String
    Mark2: Int
    Comment2: String
    Mark3: Int
    Comment3: String
    Cheating: String
    bootcamper: [Bootcamper]
}

type Colle {
    _id: ID
    Colle: String!
    Username: String!
    User_id: String!
    Campus: String!
    Final_mark: Int
    Mark1: Int
    Comment1: String
    Cheating: String
    bootcamper: [Bootcamper]
}

type Exam {
    _id: ID
    Exam: String!
    Username: String!
    User_id: String!
    Campus: String!
    Final_mark: Int
    bootcamper: [Bootcamper]
}

type Query {
    getAllBootcampers: [Bootcamper]
    getBootcampersByGender(gender: String!, campus: String): [Bootcamper]
    getDay(day: String!): [Day]
    getColle(colle: String!): [Colle]
    getExam(exam: String!): [Exam]
}
`;
