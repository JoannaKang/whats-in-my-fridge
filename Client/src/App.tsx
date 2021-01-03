import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import ApiService from './ApiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingBasket, faPlusSquare, faList } from '@fortawesome/free-solid-svg-icons'

import { useQuery } from '@apollo/client';
import {GET_USER_DATA} from './Services/queryServics';

//**Components
import CategoryList from './Components/CategoryList/CategoryList';
import MyRecipe from './Components/MyRecipe/MyRecipe';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import RecipeList from './Components/RecipeList/RecipeList';

import {Myfridgelist, FullRecipeInfo} from './Interfaces';

interface RecipeItems {
  ingredient: string;
  recipes: Array<string>;
}

interface MyRecipeList {
  _id: string,
  recipeID: string
}




function App() {

  //const [MyFridgeList, setMyfridgeList] = useState<Array<Myfridgelist>>([]);
  //const [MyShoppingList, setMyShoppingList] = useState<Array<Myfridgelist>>([]);
  const [MyRecipeList, setMyRecipeList] = useState<Array<MyRecipeList>>([]);
  const [checkedItems, setCheckedItems] = useState<Array<string>>([]);
  // eslint-disable-next-line no-unused-vars
  const [Recipeitems, setRecipeitems] = useState<Array<RecipeItems>>([]);
  const [requestedRecipe, setRequestedRecipe] = useState<Array<RecipeItems>>([]);
  const [dateview, setDateview] = useState('Category');

  // const fetchMyFridgeList = () => {
  //   return ApiService.getMyFridgeItems()
  //     .then(res => {        
  //       setMyfridgeList(res);
  //     })
  // }

  // const fetchShoppinglist = () => {
  //   ApiService.getShoppingList()
  //     .then(data => {
  //       setMyShoppingList(data)
  //     });
  // }

  const fetchRecipes = () => {
    ApiService.getRecipes()
      .then(data => setRecipeitems(data));
  }

  // const fetchMyRecipes = () => {
  //   ApiService.getMyRecipe()
  //     .then(data => setMyRecipeList(data));
  // }

  const clickboxHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      setCheckedItems([
        ...checkedItems, e.target.value]
      )
      console.log(checkedItems);
    } else {
      setCheckedItems(checkedItems.filter(el => el !== e.target.value));
      console.log(checkedItems);
    }
  }

  const getRecipeHandler = async () => {

    console.log('clicked')
    const selecteditems = checkedItems;
    const recipesitems:Array<string> = [];
    let recipes:Array<RecipeItems> = [];

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
    //fetchMyFridgeList();
    //fetchShoppinglist();
    fetchRecipes();
    // fetchMyRecipes();
  }, [])

  
  const {loading, error, data} = useQuery(GET_USER_DATA);
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const MyFridgeList = data.getMyFridgeItems;
  const MyShoppingList = data.getShoppingList;
  
  // console.log(MyShoppingList);
  // console.log(MyFridgeList);
  
  

  return (
    <>
      <Router>
        <div className="header">What's in My Fridge</div>
        <Dashboard
          //fetchShoppingList={fetchShoppinglist}
          //fetchMyFridgeList={fetchMyFridgeList}
        />

        <Switch>
          <React.Fragment>
            <Route exact path="/">
              <Home MyFridgeList={MyFridgeList}
                clickboxHandler={clickboxHandler}
                checkedItems={checkedItems}
                getRecipeHandler={getRecipeHandler}
              />
            </Route>

            <Route exact path='/shoppinglist'>
              <div className="list-container">
                <CategoryList
                  listitems={MyShoppingList}
                  //setMyfridgeList={setMyfridgeList}
                  //setMyShoppingList={setMyShoppingList}
                  //fetchMyFridgeList={fetchMyFridgeList}
                  //fetchShoppinglist={fetchShoppinglist}
                  clickboxHandler={clickboxHandler}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems} 
                  dateview={dateview}/>
              </div>
            </Route>

            <Route exact path='/inmyfridge'>
              <div className="MyFridge-container">
                <div className="button-container">
                  <button className="category" onClick={renderCategoryview} >Category</button>
                  <button className="date" onClick={renderDateview}>Date</button>
                </div>
                <CategoryList
                  listitems={MyFridgeList}
                  //setMyfridgeList={setMyfridgeList}
                  //setMyShoppingList={setMyShoppingList}
                  //fetchMyFridgeList={fetchMyFridgeList}
                  //fetchShoppinglist={fetchShoppinglist}
                  clickboxHandler={clickboxHandler}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  dateview={dateview}
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
                  MyRecipeList={MyRecipeList}
                />
              </div>
            </Route>

            <Route exact path='/recipes'>
              <div className="Recipes-container">
                <h1>Recipes list</h1>
                <RecipeList
                  setRequestedRecipe={setRequestedRecipe}
                  requestedRecipe={requestedRecipe}
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
