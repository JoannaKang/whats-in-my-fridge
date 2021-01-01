const MyfridgeItem = require('../../Models/Fridgeitem');
const ShoppingListItem = require('../../Models/ShoppingListItem');

exports.saveShoppingList = async (ItemInput) => {
  try {
    const newMyShoppingList = await ShoppingListItem.create(ItemInput);
    return await newMyShoppingList;
  } catch (e) {
    console.log(e);
  }
}

exports.saveInmyfridge = async (ItemInput) => {
  try {
    const newMyFridgeItem = await MyfridgeItem.create(ItemInput);
    return await newMyFridgeItem;
  } catch (e) {
    console.log(e)
  }
}
