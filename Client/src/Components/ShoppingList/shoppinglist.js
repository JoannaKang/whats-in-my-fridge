import react from 'react';
import './shoppinglist.css';

import ApiService from '../../ApiService'
import IngredientList from '../IngredientList/IngredientList'

import { useState, useEffect } from 'react';


const ShoppingList = () => {

  let [keywords, setKeywords] = useState()
  const [ingredientList, setIngredientList] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');


  // const getKeywords = async () => {
  //   const keywordsfromDB = await ApiService.getAllIngredients();
  //   setKeywords(keywordsfromDB)
  //   console.log(keywords.length);
  //   if (keywords.length !== 0) {
  //     keywords.map(el => el.name);
  //   }
  // }


  const changeInputData = (e) => {
    setNewIngredient(e.target.value);
  }

  const addtoList = (e) => {
    e.preventDefault();
    setIngredientList([...ingredientList, newIngredient]);
    setNewIngredient('')
  }

  // useEffect(() => {
  //   console.log("new item added")
  // }, [newIngredient]);


  return (
    <>
      <div className="pagename">Shopping List</div>
      <div className="Add-list">
        <form onSubmit={addtoList}>
          <input type="ingredeint-name" placeholder="type shopping list.." value={newIngredient} onChange={changeInputData}></input>
          <button className="add-button"> Add </button>
        </form>
        <IngredientList ingredients={ingredientList} />
      </div>
    </>
  )
}


export default ShoppingList;