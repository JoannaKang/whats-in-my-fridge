const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    getRecipes: [Recipe]!
  }

  type Recipe { 
    idMeal: String
    strMeal: String
    strCategory: String
    strArea: String
    strInstructions: String
  }
`;





