const { RESTDataSource } = require('apollo-datasource-rest');

class RecipeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.themealdb.com/api/json/v1/1/search.php?f=a'
  }

  async getRecipes() {
    console.log("getrecipes")
    return this.get()
  }
}


module.exports = RecipeAPI;