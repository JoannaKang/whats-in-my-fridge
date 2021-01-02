const MyfridgeItem = require('../../Models/Fridgeitem');
const ShoppingListItem = require('../../Models/ShoppingListItem');


exports.deleteMyfridge = async (id) => {
  try {
    console.log('Deleted😡😡😡😡😡', id)
    const result = await MyfridgeItem.deleteOne({
      _id: id
    })
    return result;
  } catch (e) {
    console.log(e);
  }
}

exports.deleteShoppingList = async (id) => {
  try {
    console.log('Deleted😡😡😡😡😡', id)
    let result = await ShoppingListItem.deleteOne({
      _id: id
    })
    return result;
  } catch (e) {
    console.log(e);
  }
}
