const BASE_URL = "http://localhost:3001";

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
  console.log('📣 fridgeItem save requested!', addedInfo)
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
  console.log('📣 fridgeItem delete requested!', checkedItem)
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
  console.log('📣 Shoppinglist SAVE requested!', addedInfo)
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
  console.log('📣 Shoppinglist requested!')
  return fetch(BASE_URL + '/shoppinglist')
    .then(res => res.json());
}


function getOneShoppingList(id) {
  return fetch(BASE_URL + `/shoppinglist/${id}`)
    .then(res => res.json());
}

async function deleteShoppingList(checkedItem) {
  try {
    for (let i = 0; i < checkedItem.length; ++i) {
      await fetch(BASE_URL + `/shoppinglist/:${checkedItem[i]}`, {
        method: 'DELETE'
      })
    }
    console.log('📣 Shoppinglist deleted!', checkedItem)
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

function getRecipes() {
  console.log('📣 Recipe list requested!')
  return fetch(BASE_URL + '/recipies')
    .then(res => res.json());
}

function getOneRecipe(id) {
  console.log('📣 Recipe requested!')
  return fetch(BASE_URL + `/recipies/${id}`)
    .then(res => res.json());
}

function getMyRecipe() {
  return fetch(BASE_URL + '/myrecipe')
    .then(res => res.json())
}

async function saveMyRecipe(recipeIDs) {
  console.log('📣 My Recipe SAVE requested!', recipeIDs)
  try {
    for (let i = 0; i < recipeIDs.length; i++) {
      await fetch(BASE_URL + '/recipes', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeID: recipeIDs[i]
        })
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
  deleteShoppingList,
  getRecipes,
  getOneRecipe,
  getMyRecipe,
  saveMyRecipe
}

export default exports;