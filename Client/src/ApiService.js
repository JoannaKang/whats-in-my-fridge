const BASE_URL = "http://localhost:4000";

function getAllIngredients() {
  return fetch(BASE_URL + '/ingredients')
    .then(response => response.json())
}

function getMyFridgeItems() {
  return fetch(BASE_URL + '/inmyfridge')
    .then(res => res.json())
}

function getOneMyFridgeItem(id) {
  return fetch(BASE_URL + `/inmyfridge/${id}`)
    .then(res => res.json());
}

async function saveMyfridgeList(addedInfo) {
  console.log('📣 fridgeItem saved!', addedInfo)
  try {
    for (let i = 0; i < addedInfo.length; i++) {
      const status = await fetch(BASE_URL + '/inmyfridge', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: addedInfo[i].name,
          category: addedInfo[i].category,
          quantity: addedInfo[i].quantity,
          saved: "Fridge"
        })
      })
    }
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

async function deleteMyFridgeItems(checkedItem) {
  console.log('📣 fridgeItem deleted!', checkedItem)
  try {
    for (let i = 0; i < checkedItem.length; ++i) {
      await fetch(BASE_URL + `/inmyfridge/:${checkedItem[i]}`, {
        method: 'DELETE'
      })
    }
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

async function saveShoppingList(addedInfo) {
  console.log('📣 Shoppinglist SAVED!', addedInfo)
  try {
    for (let i = 0; i < addedInfo.length; i++) {
      await fetch(BASE_URL + '/shoppinglist', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: addedInfo[i].name,
          category: addedInfo[i].category,
          quantity: addedInfo[i].quantity,
          saved: "ShoppingList"
        })
      })
    }

  } catch (err) {
    console.log(err)
    alert(err);
  }
}

function getShoppingList() {
  console.log('📣 Shoppinglist Fetched!')
  return fetch(BASE_URL + '/shoppinglist')
    .then(res => res.json());
}

function getOneShoppingList(id) {
  return fetch(BASE_URL + `/shoppinglist/${id}`)
    .then(res => res.json());
}

async function deleteShoppingList(checkedItem) {
  console.log('📣 Shoppinglist deleted!', checkedItem)
  try {
    for (let i = 0; i < checkedItem.length; ++i) {
      await fetch(BASE_URL + `/shoppinglist/:${checkedItem[i]}`, {
        method: 'DELETE'
      })
    }
  } catch (err) {
    console.log(err)
    alert(err);
  }
}



const exports = {
  getAllIngredients,
  saveMyfridgeList,
  getMyFridgeItems,
  getOneMyFridgeItem,
  deleteMyFridgeItems,
  saveShoppingList,
  getShoppingList,
  getOneShoppingList,
  deleteShoppingList
}

export default exports;