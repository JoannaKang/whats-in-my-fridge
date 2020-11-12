import './shoppinglist.css';
import ApiService from '../../ApiService'
import IngredientList from '../IngredientList/IngredientList'

import { useState, useEffect } from 'react';


const ShoppingList = (props) => {

  // let [keywords, setKeywords] = useState()
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    category: '',
    quantity: 0,
  });

  // const getKeywords = async () => {
  //   const keywordsfromDB = await ApiService.getAllIngredients();
  //   setKeywords(keywordsfromDB)
  //   console.log(keywords.length);
  //   if (keywords.length !== 0) {
  //     keywords.map(el => el.name);
  //   }
  // }


  const updateName = e => {
    setAddIngredient({
      ...addIngredient,
      name: e
    })
  }

  const updateCategory = e => {
    setAddIngredient({
      ...addIngredient,
      category: e,
    })
  }

  const updateQuantity = e => {
    setAddIngredient(
      {
        ...addIngredient,
        quantity: e
      }
    )
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.setShoppingList([addIngredient, ...props.shoppinglist]);
  }

  const savetoDB = () => {
    ApiService.saveShoppingList(props.shoppinglist);
  }

  return (
    <>
      <div className="list-container">
        <div className="Add-list">
          <h1>Shopping List</h1>
          <form className="input-form" onSubmit={submitHandler}>
            <input type="ingredeint-add" placeholder="type shopping list.." value={addIngredient.name} onChange={e => updateName(e.target.value)}></input>
            <select className="catecory-select" value={addIngredient.category} onChange={(e) => updateCategory(e.target.value)} >
              <option>-Select-</option>
              <option>Veggies</option>
              <option>Meat</option>
              <option>Dairy</option>
              <option>Bakery</option>
              <option>Dessert</option>
              <option>Sauce</option>
              <option>Spice</option>
              <option>etc</option>
            </select>
            <input className="quantity" type="number" min='0' value={addIngredient.quantity} onChange={e => updateQuantity(e.target.value)}></input>
            <button className="add-button"> Add </button>
          </form>
        </div>
        <div className="ingredient-list">
          <IngredientList ingredients={props.shoppinglist} />
        </div>
        <button onClick={savetoDB}>Save Shopping List</button>
      </div>

    </>
  )
}


export default ShoppingList;