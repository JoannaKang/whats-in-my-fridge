const BASE_URL = "http://localhost:4000";

function getAllIngredients() {
  return fetch(BASE_URL + '/ingredients')
    .then(response => response.json())
}

function getMyFridgeItems() {
  return fetch(BASE_URL + '/inmyfridge')
    .then(res => res.json())
}

function saveShoppingList(addedInfo) {
  try {
    console.log(addedInfo);

    return fetch(BASE_URL + '/shoppinglist', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addedInfo.name,
        category: addedInfo.category,
        quantity: addedInfo.quantity
      })
    })

  } catch (err) {
    console.log(err)
  }
}

function getShoppingList() {
  return fetch(BASE_URL + '/shoppinglist')
    .then(res => res.json());
}

const exports = {
  getAllIngredients,
  getMyFridgeItems,
  saveShoppingList,
  getShoppingList
}

export default exports;