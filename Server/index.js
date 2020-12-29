//*Express
const express = require('express');
const app = express();
const cors = require('cors');
//*Apollo
const { ApolloServer } = require('apollo-server');
const typeDefs = require('../Server/GraphQL/typeDefs');
const resolvers = require('../Server/GraphQL/resolvers');

const router = require('./router');
const db = require('./db');

const MG_PORT = 3001
const APOLLO_PORT = 4001

app.use(cors());
app.use(express.json());
app.use(router);

db.then(
  app.listen(MG_PORT, () => {
    console.log(`🚀 MONGODB firing up on http://localhost:${MG_PORT}`);
  })
)

const server = new ApolloServer(
  {
    typeDefs, 
    resolvers
  });

server.listen(APOLLO_PORT).then(() => console.log(`🚀 APOLLO Server is listening from ${APOLLO_PORT}`));
  