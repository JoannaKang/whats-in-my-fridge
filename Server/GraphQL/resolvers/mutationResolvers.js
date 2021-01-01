const apiCreate = require('./apiCreate');
const apiDelete = require('./apiDelete');

const Mutation = {
  createShoppinglist: (_, {input}) => {
    return apiCreate.saveShoppingList(input)
  },
  createMyFridgelist: (_, {input}) => {
    return apiCreate.saveInmyfridge(input);
  },
  deleteMyFridgeList: (_, {id}) => {
    console.log('🤔🤔🤔🤔🤔🤔🤔🤔', id);
    return apiDelete.deleteMyfridge(id);
  }
}


module.exports = { Mutation };