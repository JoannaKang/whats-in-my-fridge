const apiCreate = require('./apiCreate');
const apiDelete = require('./apiDelete');

const Mutation = {
  createShoppingList: (_, {input}) => {
    return apiCreate.saveShoppingList(input)
  },
  createMyFridgeList: (_, {input}) => {
    return apiCreate.saveInmyfridge(input);
  },
  deleteMyFridgeList: (_, {id}) => {
    return apiDelete.deleteMyfridge(id);
  },
  deleteShoppingList: (_, {id}) => {
    return apiDelete.deleteShoppingList(id);
  }
}


module.exports = { Mutation };