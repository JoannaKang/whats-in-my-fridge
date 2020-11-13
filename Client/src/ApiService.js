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
  console.log('⛵', id)
  return fetch(BASE_URL + `/inmyfridge/${id}`)
    .then(res => res.json());
}


function saveMyfridgeList(addedInfo) {
  console.log('📣 fridgeItem saved!', addedInfo)
  try {
    return fetch(BASE_URL + '/inmyfridge', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addedInfo.name,
        category: addedInfo.category,
        quantity: addedInfo.quantity,
        saved: "Fridge"
      })
    })

  } catch (err) {
    console.log(err)
  }
}

function deleteMyFridgeItems(checkedItem) {
  console.log('📣 fridgeItem deleted!', checkedItem)
  try {
    checkedItem.map(el =>
      fetch(BASE_URL + `/inmyfridge/:${el}`, {
        method: 'DELETE'
      }))
  } catch (err) {
    console.log(err)
  }
}

function saveShoppingList(addedInfo) {
  console.log('📣 Shoppinglist SAVED!', addedInfo)
  try {
    addedInfo.map(el =>
      fetch(BASE_URL + '/shoppinglist', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: el.name,
          category: el.category,
          quantity: el.quantity,
          saved: "ShoppingList"
        })
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function getShoppingList() {
  console.log('📣 Shoppinglist Fetched!')
  return fetch(BASE_URL + '/shoppinglist')
    .then(res => res.json());
}

const exports = {
  getAllIngredients,
  saveMyfridgeList,
  getMyFridgeItems,
  getOneMyFridgeItem,
  deleteMyFridgeItems,
  saveShoppingList,
  getShoppingList,
}

export default exports;