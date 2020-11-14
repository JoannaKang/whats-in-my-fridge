//*Express
const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./router');
const db = require('./db');

const MG_PORT = 3001

app.use(cors());
app.use(express.json());
app.use(router);

db.then(
  app.listen(MG_PORT, () => {
    console.log(`🚀 MONGODB firing up on http://localhost:${MG_PORT}`);
  })
)

//*GraphQL
// const { ApolloServer, gql } = require('apollo-server');

// const { typeDefs } = require('./GraphQL/typeDefs');
// const resolvers = require('./GraphQL/resolvers');
// const RecipeAPI = require('./GraphQL/resolvers');

// // const APL_PORT = 4000

// const apollo_server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   dataSources: () => {
//     return {
//       recipesApi: new RecipeAPI(),
//     };
//   },
//   context: () => {
//     return {
//       token: 'foo',
//     }
//   }
// });

// console.log(apollo_server);

// apollo_server.listen().then((APL_PORT) => {
//   console.log(`🔌  Apollo Server ready at ${APL_PORT}`);
// })