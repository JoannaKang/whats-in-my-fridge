const BASE_URL = "http://localhost:3001";

interface Item {
  name:string;
  category: string;
  quantity: number;
  saved: string;
}

function getAllIngredients() {
  return fetch(BASE_URL + '/ingredients')
    .then(response => response.json())
}

function getMyFridgeItems() {
  return fetch(BASE_URL + '/inmyfridge')
    .then(res => res.json())
}

function getOneMyFridgeItem(id:string) {
  console.log('calling getonemyfridgeitem');
  const query = `{
    getOneMyFridgeItem (id: "${id}") {
      _id
      name
      category
      quantity
      saved
      date
    }
  }`

  return fetch(BASE_URL + `/graphql?query=` + query)
    .then(res => res.json());
    
}

function getOneShoppingList(id:string): Promise<Item> {
  const query = `{
    getOneShoppingList (id: "${id}") {
      _id
      name
      category
      quantity
      saved
      date
    }
  }`
  return fetch(BASE_URL + `/graphql?query=`+ query)
    .then(res => res.json());
}

// function getOneRecipe(id:string) {  
//   const query = `{
//     getOneRecipe (id: "${id}") {
//       idMeal
//       strMeal
//       strCategory
//       strArea
//       strInstructions
//       strMealThumb
//       strIngredient1
//       strIngredient2
//       strIngredient3
//       strIngredient4
//       strIngredient5
//       strIngredient6
//       strIngredient7
//       strIngredient8
//       strIngredient9
//       strIngredient10
//       strIngredient11
//       strIngredient12
//       strIngredient13
//       strIngredient14
//       strIngredient15
//       strIngredient16
//       strIngredient17
//       strIngredient18
//       strIngredient19
//       strIngredient20
//       strMeasure1
//       strMeasure2
//       strMeasure3
//       strMeasure4
//       strMeasure5
//       strMeasure6
//       strMeasure7
//       strMeasure8
//       strMeasure9
//       strMeasure10
//       strMeasure11
//       strMeasure12
//       strMeasure13
//       strMeasure14
//       strMeasure15
//       strMeasure16
//       strMeasure17
//       strMeasure18
//       strMeasure19
//       strMeasure20
//     }
//   }`
//   return fetch(BASE_URL + `/graphql?query=`+ query)
//   .then(res => res.json());
// }


async function saveMyfridgeList(addedInfo:Item[]) {
  console.log('📣 fridgeItem save requested!', addedInfo)
  try {
    for (let i = 0; i < addedInfo.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      // const query = JSON.stringify({
      //   query: `mutation CreateMyFridgelist(
      //     $newMyFridgelist: ItemInput!
      //    ) {
      //      createMyFridgelist(input: $newMyFridgelist) {
      //        name
      //        category
      //        quantity
      //        saved
      //      }
      //    }
      //   `
      // })

      // return fetch(BASE_URL + '/graphql', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: query
      // })
    }
  } catch (err) {
    console.log(err)
    alert(err);
  }
}

// async function deleteMyFridgeItems(checkedItem:Array<string>) {
//   console.log('📣 fridgeItem delete requested!', checkedItem)
//   try {
//     for (let i = 0; i < checkedItem.length; ++i) {
//       await fetch(BASE_URL + `/inmyfridge/:${checkedItem[i]}`, {
//         method: 'DELETE'
//       })
//     }
//   } catch (err) {
//     console.log(err)
//     alert(err);
//   }
// }

async function saveShoppingList(addedInfo:Item[]) {
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

      // console.log(addedInfo[i]);
      // const shoppinglist = addedInfo[i]
      
      // {
      //   "newShoppinglist" : addedInfo[i]
      // }
      
      // const query = JSON.stringify({
      //   query: `mutation CreateShoppinglist(
      //     $newShoppinglist: ItemInput!
      //    ) {
      //     createShoppinglist(input: $newShoppinglist) {
      //        name
      //        category
      //        quantity
      //        saved
      //      }
      //    }
      //   `
      // })

      // return fetch(BASE_URL + '/graphql', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: query
      // })
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



// async function deleteShoppingList(checkedItem:Array<string>) {
//   try {
//     for (let i = 0; i < checkedItem.length; ++i) {
//       await fetch(BASE_URL + `/shoppinglist/:${checkedItem[i]}`, {
//         method: 'DELETE'
//       })
//     }
//     console.log('📣 Shoppinglist deleted!', checkedItem)
//   } catch (err) {
//     console.log(err)
//     alert(err);
//   }
// }

function getRecipes() {
  console.log('📣 Recipe list requested!')
  return fetch(BASE_URL + '/recipies')
    .then(res => res.json());
}

// function getOneRecipe(id:string) {
//   console.log('📣 Recipe requested!')
//   return fetch(BASE_URL + `/recipies/${id}`)
//     .then(res => res.json());
// }

// function getMyRecipe() {
//   return fetch(BASE_URL + '/myrecipe')
//     .then(res => res.json())
// }

async function saveMyRecipe(recipeIDs:Array<string>) {
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
  // deleteMyFridgeItems,
  saveShoppingList,
  getShoppingList,
  getOneShoppingList,
  // deleteShoppingList,
  getRecipes,
  // getOneRecipe,
  // getMyRecipe,
  saveMyRecipe
}

export default exports;