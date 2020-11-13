import './shoppinglist.css';
import ApiService from '../../ApiService'
import IngredientList from '../IngredientList/IngredientList'

import { useState } from 'react';


//TODO: Separate Add feature to subcomponent -> add In My Frideg component

const ShoppingList = (props) => {
  // let [keywords, setKeywords] = useState()
  console.log(props)
  // const [addIngredient, setAddIngredient] = useState({
  //   name: '',
  //   category: '',
  //   quantity: 0
  // });

  // const getKeywords = async () => {
  //   const keywordsfromDB = await ApiService.getAllIngredients();
  //   setKeywords(keywordsfromDB)
  //   console.log(keywords.length);
  //   if (keywords.length !== 0) {
  //     keywords.map(el => el.name);
  //   }
  // }

  const AllList = props.shoppinglist.flatMap(el => el);

  const VeggiesList = AllList.filter(el => el.category === "Veggies");
  const MeatList = AllList.filter(el => el.category === "Meat");
  const FishList = AllList.filter(el => el.category === "Fish");
  const DairyList = AllList.filter(el => el.category === "Dairy");
  const BakeryList = AllList.filter(el => el.category === "Bakery");
  const DessertList = AllList.filter(el => el.category === "Dessert");
  const SauceList = AllList.filter(el => el.category === "Sauce");
  const SpiceList = AllList.filter(el => el.category === "Spice");
  const etcList = AllList.filter(el => el.category === "etc");


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
    ApiService.saveShoppingList(addIngredient).then(() => props.fetchShoppingList());
  }

  return (
    <>

      {/* TODO: Only render category if something inside it*/}
      <div className="list-container">
        {/* <div className="Add-list">
          <h1>Shopping List</h1>
          <form className="input-form" onSubmit={submitHandler}>
            <input type="ingredeint-add" placeholder="type shopping list.." value={addIngredient.name} onChange={e => updateName(e.target.value)}></input>
            <select className="catecory-select" value={addIngredient.category} onChange={(e) => updateCategory(e.target.value)} >
              <option>-Select-</option>
              <option>Veggies</option>
              <option>Meat</option>
              <option>Fish</option>
              <option>Dairy</option>
              <option>Bakery</option>
              <option>Dessert</option>
              <option>Sauce</option>
              <option>Spice</option>
              <option>etc</option>
            </select>
            <input className="quantity" type="number" min='1' value={addIngredient.quantity} onChange={e => updateQuantity(e.target.value)}></input>
            <button className="add-button"> Add </button>
          </form>
        </div> */}
        <div className="ingredient-list">
          <div><h1>Veggies</h1></div>
          <IngredientList ingredients={VeggiesList} />
          <div><h1>Meat</h1></div>
          <IngredientList ingredients={MeatList} />
          <div><h1>Fish</h1></div>
          <IngredientList ingredients={FishList} />
          <div><h1>Dairy</h1></div>
          <IngredientList ingredients={DairyList} />
          <div><h1>Bakery</h1></div>
          <IngredientList ingredients={BakeryList} />
          <div><h1>Dessert</h1></div>
          <IngredientList ingredients={DessertList} />
          <div><h1>Sauce</h1></div>
          <IngredientList ingredients={SauceList} />
          <div><h1>Spice</h1></div>
          <IngredientList ingredients={SpiceList} />
          <div><h1>etc</h1></div>
          <IngredientList ingredients={etcList} />
        </div>
        <button>Move to My Fridge</button>
      </div>

    </>
  )
}


export default ShoppingList;