const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer(
  {
    typeDefs, 
    resolvers
  });

server.listen(4001).then(() => console.log(`🚀Server is listening from 4001`));
  