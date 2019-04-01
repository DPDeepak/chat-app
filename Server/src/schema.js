const typeDefs = `
type Messages {
    to: String!
    from: String!
    message: String!
}

type Query {
    users: [User]
    friends(
    name: String!
    ): [String]
    user(
    name: String!
    email: String!
    ): User
    messages:[Messages]
}

type User {
    id: ID!
    name: String!
    email: String!
    friends: [ID]
}

type Mutation {
    sendMessage(to: String!, from: String!, message: String!): Messages
    addUser(name: String!, email: String!): User
}

type Subscription {
    messageSent: Messages
    userCreated: User
}`

module.exports = typeDefs;  