import IngredientItem from '../IngredientItem/IngredientItem'
import Button from '../Buttons/Buttons'
import React, { useState, useEffect } from 'react';
import './CategorytList.css'

const CategoryList = (props) => {
  if (props.listitems.length === 0) {
    return null;
  }

  const dateItems = []
  props.listitems.map(el => {
    dateItems.push({
      date: el.date.slice(0, 10),
      name: el.name,
      quantity: el.quantity
    })
  })
  dateItems.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date)
  })


  let dateDiv = []
  let previousDate = undefined;
  let previousName = undefined;
  let previousQuantity = undefined;
  for (let i = 0; i < dateItems.length; ++i) {
    if (i === 0) {
      previousDate = dateItems[i].date;
      previousName = dateItems[i].name;
      previousQuantity = dateItems[i].quantity;
      dateDiv.push(<><div>{previousDate}</div> <div>{previousName}</div> <div>{previousQuantity}</div></>);
    }
    else {
      if (dateItems[i].date !== previousDate) {
        previousDate = dateItems[i].date;
        previousName = dateItems[i].name;
        previousQuantity = dateItems[i].quantity;
        dateDiv.push(<><div>{dateItems[i].date}</div><div>{previousName}</div> <div>{previousQuantity}</div></>);
      }
    }
  }


  const AllList = props.listitems.flatMap(el => el)

  const VeggiesList = AllList.filter(el => el.category === "🥦 Veggies");
  const MeatList = AllList.filter(el => el.category === "🥩 Meat");
  const FishList = AllList.filter(el => el.category === "🐟 Fish");
  const DairyList = AllList.filter(el => el.category === "🥛 Dairy");
  const FruitList = AllList.filter(el => el.category === "🍓 Fruit");
  const BakeryList = AllList.filter(el => el.category === "🥖 Bakery");
  const DessertList = AllList.filter(el => el.category === "🍰 Dessert");
  const SauceList = AllList.filter(el => el.category === "🍯 Sauce");
  const SpiceList = AllList.filter(el => el.category === "🧂 Spice");
  const etcList = AllList.filter(el => el.category === "💫 etc");

  if (props.dateview === 'Category' || props.dateview === undefined) {
    return (
      <React.Fragment>
        <div className="category-container">
          <div className="category-div"><h2>🥦 Veggies</h2></div>
          <IngredientItem
            ingredientItems={VeggiesList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🥩 Meat</h2></div>
          <IngredientItem
            ingredientItems={MeatList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🐟 Fish</h2></div>
          <IngredientItem
            ingredientItems={FishList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🥛 Dairy</h2></div>
          <IngredientItem
            ingredientItems={DairyList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🍓 Fruit</h2></div>
          <IngredientItem
            ingredientItems={FruitList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🥖 Bakery</h2></div>
          <IngredientItem
            ingredientItems={BakeryList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🍰 Dessert</h2></div>
          <IngredientItem
            ingredientItems={DessertList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🍯 Sauce</h2></div>
          <IngredientItem
            ingredientItems={SauceList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>🧂 Spice</h2></div>
          <IngredientItem
            ingredientItems={SpiceList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <div className="category-div"><h2>💫 etc</h2></div>
          <IngredientItem
            ingredientItems={etcList}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems} />
          <Button
            listitems={props.listitems}
            setMyShoppingList={props.setMyShoppingList}
            setMyfridgeList={props.setMyfridgeList}
            fetchMyFridgeList={props.fetchMyFridgeList}
            fetchShoppinglist={props.fetchShoppinglist}
            clickboxHandler={props.clickboxHandler}
            checkedItems={props.checkedItems}
            setCheckedItems={props.setCheckedItems}
          />
        </div>

      </React.Fragment>
    )
  } else if (props.dateview === 'Date') {
    return (
      <div>{dateDiv}</div>
    )
  }

}

export default CategoryList