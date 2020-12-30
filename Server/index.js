//*Express
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const cors = require('cors');
//*Apollo
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../Server/GraphQL/typeDefs');
const resolvers = require('../Server/GraphQL/resolvers');
const Schema = require('./GraphQL/typeDefs');

const router = require('./router');
const db = require('./db');

const PORT = 3001
// const APOLLO_PORT = 4001

app.use(cors());
app.use(express.json());
app.use(router);

const server = new ApolloServer(
  {
    typeDefs, 
    resolvers
  });
server.applyMiddleware({ app });

db.then(() => {
  console.log(`🙊 MONGODB is connected`);
  app.listen(PORT, () => {
    console.log(`🚀 APOLLO & MONGO Server is listening from http://localhost:${PORT}`)
  })
}
)