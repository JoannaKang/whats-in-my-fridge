const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getIngredients: [String]
    fetchRecipesfromAPI: [Recipe]
    getIngredientsList: [Ingredients]
    getMyFridgeItems: [Item]
    getShoppingList: [Item]
    getOneMyFridgeItem(id: String!): Item
    getOneShoppingList(id: String!): Item
    getMyRecipeItems: [Myrecipe]
    getOneRecipe(id: String!): Recipe
    getFullRecipe: [Recipe]
  }

  type Mutation {
    createUser(input: UserInput): User
    createShoppingList(input: ItemInput!): Item
    createMyFridgeList(input: ItemInput!): Item
    deleteMyFridgeList(id: String!): Item
    deleteShoppingList(id: String!): Item
  }

  type Recipe { 
    idMeal: String,
    strMeal: String,
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
    strIngredient1: String,
    strIngredient2: String,
    strIngredient3: String,
    strIngredient4: String,
    strIngredient5: String,
    strIngredient6: String,
    strIngredient7: String,
    strIngredient8: String,
    strIngredient9: String,
    strIngredient10: String,
    strIngredient11: String,
    strIngredient12: String,
    strIngredient13: String,
    strIngredient14: String,
    strIngredient15: String,
    strIngredient16: String,
    strIngredient17: String,
    strIngredient18: String,
    strIngredient19: String,
    strIngredient20: String,
    strMeasure1: String,
    strMeasure2: String,
    strMeasure3: String,
    strMeasure4: String,
    strMeasure5: String,
    strMeasure6: String,
    strMeasure7: String,
    strMeasure8: String,
    strMeasure9: String,
    strMeasure10: String,
    strMeasure11: String,
    strMeasure12: String,
    strMeasure13: String,
    strMeasure14: String,
    strMeasure15: String,
    strMeasure16: String,
    strMeasure17: String,
    strMeasure18: String,
    strMeasure19: String,
    strMeasure20: String
  }

  type Ingredients {
    idIngredient: String,
    strIngredient: String,
    strDescription: String,
    strType: String
  }

  type Item {
    _id: String,
    name: String,
    category: String,
    quantity: Int,
    date: String,
    saved: String
  }

  type Myrecipe{
    recipeID: String
  }
  
  type User {
    _id: String,
    shoppinglistitem: [Item],
    fridgeitem: [Item],
    myrecipe: [Myrecipe]
  }

  input ItemInput {
    name: String,
    category: String,
    quantity: Int,
    saved: String
  }

  input MyrecipeInput {
    recipeId: String
  }

  input UserInput {
    _id: String
  }
`;

module.exports = typeDefs;