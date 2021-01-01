const { Query } = require('./resolvers/queryResolvers');
const { Mutation } = require('./resolvers/mutationResolvers');

const resolvers = {
  Query,
  Mutation
}



module.exports = resolvers;