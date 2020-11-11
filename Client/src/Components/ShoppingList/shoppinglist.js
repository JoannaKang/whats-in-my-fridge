import react from 'react';
import './shoppinglist.css';

import ApiService from '../../ApiService'
import IngredientList from '../IngredientList/IngredientList'

import { useState, useEffect } from 'react';


const ShoppingList = () => {

  // let [keywords, setKeywords] = useState()
  const [addIngredient, setAddIngredient] = useState({
    name: '',
    category: ''
  });

  console.log(addIngredient);
  const [shoppinglist, setShoppingList] = useState([]);
  console.log(shoppinglist);

  // const setShoppinglistInfo = (addIngredient) => {
  //   setShoppingList(addIngredient);
  //   console.log(shoppinglist)
  // }

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

  const submitHandler = (event) => {
    event.preventDefault();
    setShoppingList([addIngredient, ...shoppinglist]);
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
              <option>Sauce</option>
              <option>Spice</option>
              <option>etc</option>
            </select>
            <button className="add-button"> Add </button>
          </form>

        </div>
        <div className="incredient-list">
          <IngredientList ingredients={shoppinglist} />
        </div>
      </div>
    </>
  )
}


export default ShoppingList;