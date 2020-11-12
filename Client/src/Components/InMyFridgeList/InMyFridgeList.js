import './InMyFridgeList.css';
import ApiService from '../../ApiService';
import IngredientItem from '../IngredientItem/IngredientItem'
import { useState, useEffect } from 'react';

const InMyFridgeList = (props) => {
  if (props.fridgelist.length === 0) {
    return null
  }

  const AllList = props.fridgelist.flatMap(el => el)

  const VeggiesList = AllList.filter(el => el.category === "Veggies");
  const MeatList = AllList.filter(el => el.category === "Meat");
  const FishList = AllList.filter(el => el.category === "Fish");
  const DairyList = AllList.filter(el => el.category === "Dairy");
  const BakeryList = AllList.filter(el => el.category === "Bakery");
  const DessertList = AllList.filter(el => el.category === "Dessert");
  const SauceList = AllList.filter(el => el.category === "Sauce");
  const SpiceList = AllList.filter(el => el.category === "Spice");
  const etcList = AllList.filter(el => el.category === "etc");



  return (
    <>
      <div className="MyFridge-container">
        <h1>In My Fridge</h1>
        <div><h1>Veggies</h1></div>
        <IngredientItem ingredientItems={VeggiesList} />
        <div><h1>Meat</h1></div>
        <IngredientItem ingredientItems={MeatList} />
        <div><h1>Fish</h1></div>
        <IngredientItem ingredientItems={FishList} />
        <div><h1>Dairy</h1></div>
        <IngredientItem ingredientItems={DairyList} />
        <div><h1>Bakery</h1></div>
        <IngredientItem ingredientItems={BakeryList} />
        <div><h1>Dessert</h1></div>
        <IngredientItem ingredientItems={DessertList} />
        <div><h1>Sauce</h1></div>
        <IngredientItem ingredientItems={SauceList} />
        <div><h1>Spice</h1></div>
        <IngredientItem ingredientItems={SpiceList} />
        <div><h1>etc</h1></div>
        <IngredientItem ingredientItems={etcList} />
      </div>
    </>
  )
}

export default InMyFridgeList