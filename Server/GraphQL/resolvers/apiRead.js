const MyfridgeItem = require('../../Models/Fridgeitem');
const ShoppingListItem = require('../../Models/ShoppingListItem');

exports.getMyFridgeList = async () => {
  try {
    const AllFridgeList = await MyfridgeItem.find({});
    console.log(AllFridgeList);
    return AllFridgeList;
  } catch (e) {
    console.log(e);
  }
};

exports.getShoppingList = async () => {
  try {
    const AllshoppingList = await ShoppingListItem.find({});
    console.log("From ShoppingList collection", AllshoppingList)
    return AllshoppingList;
  } catch (e) {
    console.log(e);
  }
};

exports.getOnegetMyFridgeItem = async (id) => {
  try {
    console.log('Find One from My Fridge', id)
    const foundedItem = await MyfridgeItem.findOne({
      _id: id
    });
    return foundedItem;
    // res.status(200).send(foundedItem);
  } catch (e) {
    console.log(e);
    // res.sendStatus(500);
  }
}