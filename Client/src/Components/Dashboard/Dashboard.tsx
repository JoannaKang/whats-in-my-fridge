/* eslint-disable @typescript-eslint/no-unused-vars */
import './Dashboard.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import { useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../../Services/queryServics';
import {
  CREATE_SHOPPING_LIST,
  CREATE_MYFRIDGE_LIST
} from '../../Services/mutationService'


interface InitialState {
  name: string;
  category: string;
  quantity: number;
  saved: string;
}

const AddItems = () => {

  const initialState = {
    name: '',
    category: '',
    quantity: 1,
    saved: ''
  };
  
  const [addIngredient, setAddIngredient] = useState<InitialState>(initialState);

  const [createShoppinglist] = useMutation(CREATE_SHOPPING_LIST, {refetchQueries:[{query: GET_USER_DATA}]});
  const [createMyFridgeList] = useMutation(CREATE_MYFRIDGE_LIST, {refetchQueries:[{query: GET_USER_DATA}]});


  const updateName = (e:string)=> {
    setAddIngredient({
      ...addIngredient,
      name: e
    })
  }

  const updateCategory = (e:string) => {
    setAddIngredient({
      ...addIngredient,
      category: e,
    })
  }

  const updateQuantity = (e:number) => {
    setAddIngredient(
      {
        ...addIngredient,
        quantity: e
      }
    )
  }

  const myfridgeHandler = (event:any) => {
    event.preventDefault();
    const {name, category, quantity} = addIngredient;
    const myFridgeItem = Object.assign({},{name:name, category:category, quantity:quantity, saved: 'Fridge'})
    createMyFridgeList({
      variables: {newMyFridgelist: myFridgeItem}
    })
    setAddIngredient(initialState);
  }
 
  const shoppinglistHandler = (event:any) => {
    event.preventDefault();
    const {name, category, quantity} = addIngredient;
    const shoppingListItem = Object.assign({},{name:name, category:category, quantity:quantity, saved: 'ShoppingList'})
    createShoppinglist({
      variables: {newShoppinglist: shoppingListItem}
    })
    setAddIngredient(initialState);
  }

  return (
    <>
      <div className="Add-list">
        <form className="input-form" >
          <input type="ingredeint-add" className="text-input" placeholder="+ Add new Item" value={addIngredient.name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateName(e.target.value)}></input>
          <select className="catecory-select" value={addIngredient.category} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => updateCategory(e.target.value)} >
            <option>-Select-</option>
            <option>🥦 Veggies</option>
            <option>🥩 Meat</option>
            <option>🐟 Fish</option>
            <option>🥛 Dairy</option>
            <option>🍓 Fruit</option>
            <option>🥖 Bakery</option>
            <option>🍰 Dessert</option>
            <option>🍯 Sauce</option>
            <option>🧂 Spice</option>
            <option>💫 etc</option>
          </select>
          <input className="quantity" type="number" min='1' value={addIngredient.quantity} onChange={(e:React.ChangeEvent<HTMLInputElement>) => updateQuantity(parseInt(e.target.value))}></input>
          <button className="add-shoppinglist" onClick={shoppinglistHandler} style={{ textDecoration: 'none', color: '#3f454d' }}>
            <Link to="/shoppinglist">
              <FontAwesomeIcon icon={faShoppingBasket} /> Add to Shop List
            </Link>
          </button>
          <button className="add-to-myfridge" onClick={myfridgeHandler} style={{ textDecoration: 'none', color: '#3f454d' }}>
            <Link to="/inmyfridge">
              <FontAwesomeIcon icon={faPlusSquare} /> Add to Fridge
            </Link>
          </button>
        </form>
      </div >
    </>
  )

}

export default AddItems
