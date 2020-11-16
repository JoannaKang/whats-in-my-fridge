import './Dashboard.css';
import { useState } from 'react';
import ApiService from '../../ApiService'
import Button from 'react-bootstrap/Button';

const AddItems = (props) => {
  const initialState = {
    name: '',
    category: '',
    quantity: 1
  };
  const [addIngredient, setAddIngredient] = useState(initialState);


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

  const myfridgeHandler = (event) => {
    event.preventDefault();
    ApiService.saveMyfridgeList([addIngredient]).then(() => props.fetchMyFridgeList());
    setAddIngredient(initialState);
  }

  const shoppinglistHandler = (event) => {
    event.preventDefault();
    ApiService.saveShoppingList([addIngredient]).then(() => props.fetchShoppingList());
    setAddIngredient(initialState);
  }

  return (
    <>
      <div className="Add-list">
        <form className="input-form" >
          <input type="ingredeint-add" className="text-input" placeholder="Add new Item" value={addIngredient.name} onChange={e => updateName(e.target.value)}></input>
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
          <Button href="/shoppinglist" className="add-shoppinglist" onClick={shoppinglistHandler}> Add Shoppinglist</Button>
          <Button href="/inmyfridge" className="add-to-myfridge" onClick={myfridgeHandler}> Add to My Fridge</Button>
        </form>
      </div>
    </>
  )

}

export default AddItems
