/* eslint-disable @typescript-eslint/no-unused-vars */
import './Dashboard.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ApiService from '../../ApiService'
import {Myfridgelist} from '../../Interfaces';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

interface AddItemsProps {
  //fetchShoppingList: () => void;
  //fetchMyFridgeList: () => void;
}

interface InitialState {
  name: string;
  category: string;
  quantity: number;
}

const AddItems = (props:AddItemsProps) => {

  const initialState = {
    name: '',
    category: '',
    quantity: 1
  };
  const [addIngredient, setAddIngredient] = useState<InitialState>(initialState);


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
    ApiService.saveMyfridgeList([addIngredient])
    //.then(() => props.fetchMyFridgeList());
    setAddIngredient(initialState);
  }

  const shoppinglistHandler = (event:any) => {
    event.preventDefault();
    ApiService.saveShoppingList([addIngredient])
    //.then(() => props.fetchShoppingList());
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
