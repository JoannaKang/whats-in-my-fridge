//**Import React */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './App.css';
import ApiService from './ApiService';

//**Components
import CategoryList from './Components/CategoryList/CategoryList';
import MyRecipe from './Components/MyRecipe/MyRecipe';
import Home from './Components/Home/Home';
import Dashboard from '../src/Components/Dashboard/Dashboard';
import RecipeList from '../src/Components/RecipeList/RecipeList';


function App() {

  const [MyFridgeList, setMyfridgeList] = useState([]);
  const [MyShoppingList, setMyShoppingList] = useState([]);
  const [MyRecipeList, setMyRecipeList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [Recipeitems, setRecipeitems] = useState([]);
  const [requestedRecipe, setRequestedRecipe] = useState([]);

  const fetchMyFridgeList = () => {
    ApiService.getMyFridgeItems()
      .then(res => {
        setMyfridgeList(res);
      })
  }

  const fetchShoppinglist = () => {
    ApiService.getShoppingList()
      .then(data => {
        setMyShoppingList(data)
      });
  }

  const fetchRecipes = () => {
    ApiService.getRecipes()
      .then(data => setRecipeitems(data));
  }

  const fetchMyRecipes = () => {
    ApiService.getMyRecipe()
      .then(data => setMyRecipeList(data));
  }

  const clickboxHandler = (e) => {
    if (e.target.checked === true) {
      setCheckedItems([
        ...checkedItems, e.target.value]
      )
    } else {
      setCheckedItems(checkedItems.filter(el => el !== e.target.value));
    }
  }

  const getRecipeHandler = async () => {

    console.log('clicked')
    const selecteditems = checkedItems;
    const recipesitems = [];
    let recipes = [];

    for (let i = 0; i < selecteditems.length; i++) {
      await ApiService.getOneMyFridgeItem(selecteditems[i])
        .then((res) => {
          recipesitems.push(res.name);
        })
    }

    const Allingredients = await ApiService.getAllIngredients();

    for (let i = 0; i < recipesitems.length; i++) {
      for (let j = 0; j < Allingredients.length; j++) {
        if (recipesitems[i] === Allingredients[j].name) {
          recipes.push({
            ingredient: Allingredients[j].name,
            recipes: Allingredients[j].recipes
          })
        }
      }
    }

    setRequestedRecipe(recipes)
  }

  useEffect(() => {
    fetchMyFridgeList();
    fetchShoppinglist();
    fetchRecipes();
    fetchMyRecipes();
  }, [])



  return (
    <>
      <div className="header"><h1>What's in My Fridge</h1></div>
      <Dashboard
        fetchShoppingList={fetchShoppinglist}
        fetchMyFridgeList={fetchMyFridgeList}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Router>
        <Switch>
          <div className="main-container">

            <Route exact path="/">
              <Home MyFridgeList={MyFridgeList ? MyFridgeList : <div>SPINNER GOES HERE</div>}
                clickboxHandler={clickboxHandler}
                checkedItems={checkedItems}
                getRecipeHandler={getRecipeHandler}
              />
            </Route>


            <Route exact path='/shoppinglist'>
              <div className="list-container">
                <CategoryList
                  listitems={MyShoppingList}
                  setMyfridgeList={setMyfridgeList}
                  setMyShoppingList={setMyShoppingList}
                  fetchMyFridgeList={fetchMyFridgeList}
                  fetchShoppinglist={fetchShoppinglist}
                  clickboxHandler={clickboxHandler}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems} />
              </div>
            </Route>

            <Route exact path='/inmyfridge'>
              <div className="MyFridge-container">
                <CategoryList
                  listitems={MyFridgeList}
                  setMyfridgeList={setMyfridgeList}
                  setMyShoppingList={setMyShoppingList}
                  fetchMyFridgeList={fetchMyFridgeList}
                  fetchShoppinglist={fetchShoppinglist}
                  clickboxHandler={clickboxHandler}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
                <button onClick={getRecipeHandler}>
                  <Link to='/recipes'>Get Recipes</Link>
                </button>
              </div>
            </Route>

            <Route exact path='/myrecipe'>
              <div className="MyRecipe-container">
                <h1>My recipes list</h1>
                <MyRecipe
                  fetchMyRecipes={fetchMyRecipes}
                  MyRecipeList={MyRecipeList ? MyRecipeList : <div>SPINNER GOES HERE</div>}
                  setMyRecipeList={setMyRecipeList}
                />
              </div>
            </Route>

            <Route exact path='/recipes'>
              <div className="Recipes-container">
                <h1>Recipes list</h1>
                <RecipeList
                  setRequestedRecipe={setRequestedRecipe}
                  requestedRecipe={requestedRecipe ? requestedRecipe : <div>SPINNER GOES HERE</div>}
                  setRequestedRecipe={setRequestedRecipe}
                  fetchRecipes={fetchRecipes}
                  getRecipeHandler={getRecipeHandler}
                />
              </div>
            </Route>

          </div>
        </Switch>

        <div className="nav-bar">
          <Button href="/">
            {/* <Link to=> */}
              Go to Home
                {/* </Link> */}
          </Button>
          <Button href="/shoppinglist">
            {/* <Link to="/shoppinglist"> */}
              Shopping List
                {/* </Link> */}
          </Button>
          <Button href="/inmyfridge">
            {/* <Link to="/inmyfridge"> */}
              In My Fridge
                {/* </Link> */}
          </Button>
          <Button href="/myrecipe">
            {/* <Link to="/myrecipe"> */}
              My Recipes
                {/* </Link> */}
          </Button>
        </div>
      </Router>


    </>
  );

}
export default App;
