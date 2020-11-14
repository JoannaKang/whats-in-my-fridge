//**Import React */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import ApiService from './ApiService';

//**Components
import CategoryList from './Components/CategoryList/CategoryList';
import MyRecipe from './Components/MyRecipe/MyRecipe';
import Home from './Components/Home/Home';
import Dashbard from '../src/Components/Dashboard/Dashboard';

//TODO: Check MyFridgeList & MyShoppingList is not undefine at top level

function App() {

  const [MyFridgeList, setMyfridgeList] = useState([]);
  const [MyShoppingList, setMyShoppingList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

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

  const clickboxHandler = (e) => {
    if (e.target.checked === true) {
      setCheckedItems([
        ...checkedItems, e.target.value]
      )
    } else {
      setCheckedItems(checkedItems.filter(el => el !== e.target.value));
    }

  }

  useEffect(() => {
    fetchMyFridgeList();
    fetchShoppinglist();
  }, [])



  return (
    <>
      <div className="header"><h1>What's in My Fridge</h1></div>
      <Dashbard
        fetchShoppingList={fetchShoppinglist}
        fetchMyFridgeList={fetchMyFridgeList}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Router>
        <Switch>
          <div className="main-container">

            <Route exact path="/">
              <Home />
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
                  setCheckedItems={setCheckedItems} />
                <button>Get Recipes</button>
              </div>
            </Route>

            <Route exact path='/myrecipe'>
              <div className="MyRecipe-container">
                <MyRecipe />
              </div>
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
