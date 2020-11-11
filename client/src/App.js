import './App.css';
import ShoppingList from './Components/ShoppingList/shoppinglist'
import { useState, useEffect } from 'react';

function App() {


  return (
    <>
      <div className="header"><h1>What's in My Fridge</h1></div>
      <ShoppingList />
    </>
  );

}
export default App;
