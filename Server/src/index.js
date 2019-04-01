const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub }
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
}); 