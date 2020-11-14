import ApiService from '../../ApiService'
import { Link } from 'react-router-dom';

const Button = (props) => {

  // console.log('in button', props);

  if (props.listitems === undefined) {
    return null;
  }

  const addtoShoppinglist = async (e) => {
    props.setCheckedItems([]);

    let movedItemArray = [];
    for (let i = 0; i < props.checkedItems.length; ++i) {
      const el = props.checkedItems[i];
      let res = await ApiService.getOneMyFridgeItem(el);

      const movedItem = Object.assign({}, { name: res.name, category: res.category, quantity: res.quantity })
      movedItemArray.push(movedItem);
    }

    await ApiService.saveShoppingList(movedItemArray);

    let removedFromFridge = []
    props.checkedItems.map(el => {
      removedFromFridge.push(el)
    })
    await ApiService.deleteMyFridgeItems(removedFromFridge);


    props.fetchMyFridgeList();
    props.fetchShoppinglist();
  }

  const deleteMyfridgeItem = async () => {
    await ApiService.deleteMyFridgeItems(props.checkedItems);
    props.fetchMyFridgeList();
  }

  const movetoMyFridge = async (e) => {
    props.setCheckedItems([]);
    console.log(props.checkedItems)

    let movedItemArray = [];

    for (let i = 0; i < props.checkedItems.length; i++) {
      const el = props.checkedItems[i];
      let res = await ApiService.getOneShoppingList(el);

      const movedItem = Object.assign({}, { name: res.name, category: res.category, quantity: res.quantity })
      movedItemArray.push(movedItem);
    }

    await ApiService.saveMyfridgeList(movedItemArray);

    let removedFromShoppinglist = [];
    props.checkedItems.map(el => {
      removedFromShoppinglist.push(el)
    })
    await ApiService.deleteShoppingList(removedFromShoppinglist);

    props.fetchMyFridgeList();
    props.fetchShoppinglist();
  }

  const deleteShoppinglist = async () => {
    await ApiService.deleteShoppingList(props.checkedItems);
    props.fetchShoppinglist();
  }



  if (props.listitems[0].saved === "Fridge") {
    return (
      <>
        <button onClick={addtoShoppinglist}><Link to="/shoppinglist">Add to shopping list</Link></button>
        <button onClick={deleteMyfridgeItem}>Delete</button>
      </>
    )
  } else if (props.listitems[0].saved === "ShoppingList") {
    return (
      <>
        {/* //TODO: Delete 핸들러 구현
          //TODO: Move to my Fridge 핸들러 구현 */}
        <button onClick={movetoMyFridge}><Link to="/inmyfridge">Move to My Fridge</Link></button>
        <button onClick={deleteShoppinglist}>Delete</button>
      </>
    )
  }

  // return (
  //   <button></button>
  // )

}

export default Button