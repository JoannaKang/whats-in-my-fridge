import './App.css';
import ApiService from './ApiService';
import ShoppingList from './Components/ShoppingList/shoppinglist'
import InMyFridgeList from './Components/InMyFridgeList/InMyFridgeList'
import { useState, useEffect } from 'react';

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
      <ShoppingList shoppinglist={MyShoppingList} setShppoingList={setMyShoppingList} />
      <InMyFridgeList fridgelist={MyFridgeList} />
    </>
  );

}
export default App;
