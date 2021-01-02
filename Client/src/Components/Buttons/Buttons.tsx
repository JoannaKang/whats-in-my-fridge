import ApiService from '../../ApiService'
import { Link } from 'react-router-dom';
import React from 'react';
import './Buttons.css';
import {Myfridgelist} from '../../Interfaces';

import { useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../../Services/queryServics';
import {
  CREATE_SHOPPING_LIST,
  DELETE_MYFRIDGE_LIST,
  CREATE_MYFRIDGE_LIST,
  DELETE_SHOPPING_LIST} from '../../Services/mutationService'


interface ButtonProps {
  checkedItems: Array<string>;
  clickboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listitems: Array<Myfridgelist>;
  setCheckedItems: (value: Array<string>) => void;
}

interface Item {
  name:string;
  category: string;
  quantity: number;
  saved: string;
}

function Button (props:ButtonProps) {

  const [createShoppinglist] = useMutation(CREATE_SHOPPING_LIST, {refetchQueries:[{query: GET_USER_DATA}]});
  const [deleteMyfridgelist] = useMutation(DELETE_MYFRIDGE_LIST, {refetchQueries:[{query: GET_USER_DATA}]});
  const [createMyFridgeList] = useMutation(CREATE_MYFRIDGE_LIST, {refetchQueries:[{query: GET_USER_DATA}]});
  const [deleteShoppingList] = useMutation(DELETE_SHOPPING_LIST, {refetchQueries:[{query: GET_USER_DATA}]});

  const getCheckedItemInfo = async (checkedItems:string[], listItems:Item[]) => {
    let movedItemArray:Item[] = [];

    if (checkedItems.length > 0) {
      if (listItems[0].saved === "Fridge") {
        
        for (let i = 0; i < checkedItems.length; ++i) {
          const el = checkedItems[i];
          let res = await ApiService.getOneMyFridgeItem(el);
          const {name, category, quantity} = res.data.getOneMyFridgeItem   
          const movedItem:Item = Object.assign({}, { name: name, category: category, quantity: quantity, saved: "ShoppingList" })
          movedItemArray.push(movedItem);
        }
        // props.setCheckedItems([]);
      } else if (listItems[0].saved === "ShoppingList") {
        for (let i = 0; i < checkedItems.length; ++i) {
          const el = checkedItems[i];
          let res = await ApiService.getOneShoppingList(el);
          const {name, category, quantity} = await res.data.getOneShoppingList
          const movedItem:Item = Object.assign({}, { name: name, category: category, quantity: quantity, saved: "Fridge" })
          movedItemArray.push(movedItem);
        }
      }
    } 
    return movedItemArray;
  }
  
  async function addToShoppingList () {
    const mutation = await getCheckedItemInfo(props.checkedItems, props.listitems);
    for (let i = 0; i < mutation.length; i++) {
      await createShoppinglist({
        variables: {newShoppinglist: mutation[i]}
      });
    }
    for (let i = 0; i < props.checkedItems.length; i++) {
      await deleteMyfridgelist({
        variables: {id: props.checkedItems[i]}
      });
    }
    props.setCheckedItems([]);
  }

  async function movetoMyFridge () {
    const mutation = await getCheckedItemInfo(props.checkedItems, props.listitems);
    for (let i = 0; i < mutation.length; i++) {
      await createMyFridgeList({
        variables: {newMyFridgelist: mutation[i]}
      });
    }
    for (let i = 0; i < props.checkedItems.length; i++) {
      await deleteShoppingList({
        variables: {id: props.checkedItems[i]}
      });
    }
    props.setCheckedItems([]);
  }

  async function deleteMyFridgeItems () {
    for (let i = 0; i < props.checkedItems.length; i++) {
      await deleteMyfridgelist({
        variables: {id: props.checkedItems[i]}
      });
    }
    props.setCheckedItems([]);
  }

  async function deleteShoppingListItems () {
    for (let i = 0; i < props.checkedItems.length; i++) {
      await deleteShoppingList({
        variables: {id: props.checkedItems[i]}
      });
    }
    props.setCheckedItems([]);
  }

  const fridgeFragment:JSX.Element = <div className="button-div-1">
  <button className="add-to-shoppinglist" onClick={() => {addToShoppingList()}}><Link to="/shoppinglist" style={{ color: 'black', textDecoration: 'inherit' }}>Add to shopping list</Link></button>
  <button className="delete" onClick={() => {deleteMyFridgeItems()}}>Delete</button>
  </div>

  const shoppingListFragment:JSX.Element =  <div className="button-div">
  <button className="move-to-myfridge" onClick={() => {movetoMyFridge()}}><Link to="/inmyfridge">Move to My Fridge</Link></button>
  <button className="delete" onClick={() => {deleteShoppingListItems()}}>Delete</button>
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
  )
}

export default Button