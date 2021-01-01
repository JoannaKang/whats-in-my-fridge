const MyfridgeItem = require('../../Models/Fridgeitem');

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