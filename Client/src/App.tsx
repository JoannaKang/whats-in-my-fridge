import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import ApiService from './ApiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingBasket, faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons'

//**Components
import CategoryList from './Components/CategoryList/CategoryList';
import MyRecipe from './Components/MyRecipe/MyRecipe';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import RecipeList from './Components/RecipeList/RecipeList';
import Loader from './Components/Loader/Loader'

function App() {

  const [MyFridgeList, setMyfridgeList] = useState([]);
  const [MyShoppingList, setMyShoppingList] = useState([]);
  const [MyRecipeList, setMyRecipeList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [Recipeitems, setRecipeitems] = useState([]);
  const [requestedRecipe, setRequestedRecipe] = useState([]);
  const [dateview, setDateview] = useState('Category');

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
    console.log(e)
    if (e.target.checked === true) {
      setCheckedItems([
        ...checkedItems, e.target.value]
      )
    } else {
      setCheckedItems(checkedItems.filter(el => el !== e.target.value));
    }
    console.log(checkedItems);
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

    setRequestedRecipe(recipes);
    setCheckedItems([]);
  }

  const renderDateview = () => {
    setDateview('Date')
  }

  const renderCategoryview = () => {
    setDateview('Category')
  }

  useEffect(() => {
    fetchMyFridgeList();
    fetchShoppinglist();
    fetchRecipes();
    fetchMyRecipes();
  }, [])



  return (
    <>
      <Router>
        <div className="header">What's in My Fridge</div>
        <Dashboard
          fetchShoppingList={fetchShoppinglist}
          fetchMyFridgeList={fetchMyFridgeList}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />

        <Switch>
          <React.Fragment>
            <Route exact path="/">
              <Home MyFridgeList={MyFridgeList ? MyFridgeList : <Loader />}
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
                <div className="button-container">
                  <button className="category" onClick={renderCategoryview} >Category</button>
                  <button className="date" onClick={renderDateview}>Date</button>
                </div>
                <CategoryList
                  listitems={MyFridgeList ? MyFridgeList : <Loader />}
                  setMyfridgeList={setMyfridgeList}
                  setMyShoppingList={setMyShoppingList}
                  fetchMyFridgeList={fetchMyFridgeList}
                  fetchShoppinglist={fetchShoppinglist}
                  clickboxHandler={clickboxHandler}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  dateview={dateview}
                  setDateview={setDateview}
                />
                <Link to='/recipes'>
                  <div className='button-div'>
                    <button className="getRecipe-button" onClick={getRecipeHandler}>
                      Get Recipes
                </button>
                  </div>
                </Link>
              </div>
            </Route>

            <Route exact path='/myrecipe'>
              <div className="MyRecipe-container">
                <MyRecipe
                  fetchMyRecipes={fetchMyRecipes}
                  MyRecipeList={MyRecipeList ? MyRecipeList : <Loader />}
                  setMyRecipeList={setMyRecipeList}
                />
              </div>
            </Route>

            <Route exact path='/recipes'>
              <div className="Recipes-container">
                <h1>Recipes list</h1>
                <RecipeList
                  setRequestedRecipe={setRequestedRecipe}
                  requestedRecipe={requestedRecipe ? requestedRecipe : <Loader />}
                  fetchRecipes={fetchRecipes}
                  getRecipeHandler={getRecipeHandler}
                />
              </div>
            </Route>

          </React.Fragment>
        </Switch>

        <div className="nav-bar">
          <button>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
          </button>
          <button>
            <Link to="/shoppinglist">
              <FontAwesomeIcon icon={faShoppingBasket} /> Shopping List
                </Link>
          </button>
          <button>
            <Link to="/inmyfridge">
              <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
               In my Fridge
            </Link>
          </button>
          <button>
            <Link to="/myrecipe">
              <FontAwesomeIcon icon={faList} />
              My Recipes
            </Link>
          </button>
        </div>
      </Router>


    </>
  );

}
export default App;
