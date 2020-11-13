import './App.css';
import ApiService from './ApiService';
import ShoppingList from './Components/ShoppingList/shoppinglist'
import InMyFridgeList from './Components/InMyFridgeList/InMyFridgeList'
import MyRecipe from './Components/MyRecipe/MyRecipe'
import Home from './Components/Home/Home'
import Dashbard from '../src/Components/Dashboard/Dashboard'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


function App() {

  const [MyFridgeList, setMyfridgeList] = useState([]);
  const [MyShoppingList, setMyShoppingList] = useState([]);

  const fetchMyFridgeList = () => {
    ApiService.getMyFridgeItems()
      .then(res => {
        setMyfridgeList(res);
      })
  }

  const fetchShoppinglist = () => {
    ApiService.getShoppingList()
      .then(data => setMyShoppingList(data));
  }

  useEffect(() => {
    fetchMyFridgeList();
    fetchShoppinglist();
  }, [])



  return (
    <>
      <div className="header"><h1>What's in My Fridge</h1></div>
      <Dashbard fetchShoppingList={fetchShoppinglist} fetchMyFridgeList={fetchMyFridgeList} />

      <Router>
        <Switch>
          <div className="main-container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path='/shoppinglist'>
              <ShoppingList shoppinglist={MyShoppingList} setShoppingList={setMyShoppingList} fetchShoppingList={fetchShoppinglist} />
            </Route>

            <Route exact path='/inmyfridge'>
              <InMyFridgeList fridgelist={MyFridgeList} />
            </Route>

            <Route exact path='/myrecipe'>
              <MyRecipe />
            </Route>
          </div>
        </Switch>



        <div className="nav-bar">
          <button>
            <Link to="/">
              Go to Home
                </Link>
          </button>
          <button>
            <Link to="/shoppinglist">
              Shopping List
                </Link>
          </button>
          <button>
            <Link to="/inmyfridge">
              In My Fridge
                </Link>
          </button>
          <button>
            <Link to="/myrecipe">
              My Recipes
                </Link>
          </button>
        </div>
      </Router>


    </>
  );

}
export default App;
