import ApiService from '../../ApiService'
import { Link } from 'react-router-dom';
import React from 'react';
import './Buttons.css';
import {Myfridgelist} from '../../Interfaces';

interface ButtonProps {
  checkedItems: Array<string>;
  clickboxHandler: () => React.FormEventHandler;
  fetchMyFridgeList: () => Array<Myfridgelist>;
  fetchShoppinglist: () => Array<Myfridgelist>;
  listitems: Array<Myfridgelist>;
  setCheckedItems: (value: Array<string>) => Array<string>;
  setMyShoppingList: (value: Array<Myfridgelist>) => Array<Myfridgelist>;
  setMyfridgeList: (value: Array<Myfridgelist>) => Array<Myfridgelist>;
}

interface Item {
  name:string;
  category: string;
  quantity: number;
}


const Button = (props:ButtonProps) => {

  const addtoShoppinglist = async () => {
    props.setCheckedItems([]);

    let movedItemArray:Item[] = [];
    for (let i = 0; i < props.checkedItems.length; ++i) {
      const el = props.checkedItems[i];
      let res = await ApiService.getOneMyFridgeItem(el);

      const movedItem:Item = Object.assign({}, { name: res.name, category: res.category, quantity: res.quantity })
      movedItemArray.push(movedItem);
    }

    await ApiService.saveShoppingList(movedItemArray);

    let removedFromFridge:Array<string> = []
    props.checkedItems.map(el => {
      return removedFromFridge.push(el)
    })
    await ApiService.deleteMyFridgeItems(removedFromFridge);


    props.fetchMyFridgeList();
    props.fetchShoppinglist();
  }

  const deleteMyfridgeItem = async () => {
    await ApiService.deleteMyFridgeItems(props.checkedItems);
    props.fetchMyFridgeList();
  }

  const movetoMyFridge = async () => {
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

    let removedFromShoppinglist:Array<string> = [];
    props.checkedItems.map(el => {
      return removedFromShoppinglist.push(el)
    })
    await ApiService.deleteShoppingList(removedFromShoppinglist);

    props.fetchMyFridgeList();
    props.fetchShoppinglist();
  }

  const deleteShoppinglist = async () => {
    await ApiService.deleteShoppingList(props.checkedItems);
    props.fetchShoppinglist();
  }

  const fridgeFragment:JSX.Element = <div className="button-div-1">
  <button className="add-to-shoppinglist" onClick={addtoShoppinglist}><Link to="/shoppinglist" style={{ color: 'black', textDecoration: 'inherit' }}>Add to shopping list</Link></button>
  <button className="delete" onClick={deleteMyfridgeItem}>Delete</button>
</div>

  const shoppingListFragment:JSX.Element =  <div className="button-div">
  <button className="move-to-myfridge" onClick={movetoMyFridge}><Link to="/inmyfridge">Move to My Fridge</Link></button>
  <button className="delete" onClick={deleteShoppinglist}>Delete</button>
</div>


  let returnFragment = null;
  if (props.listitems.length > 0) {
    if (props.listitems[0].saved === "Fridge") {
      returnFragment = fridgeFragment;
    } else if (props.listitems[0].saved === "ShoppingList") {
      returnFragment = shoppingListFragment;
    }
  };


  return (
    <>
      {returnFragment}
    </>
  );

}

export default Button