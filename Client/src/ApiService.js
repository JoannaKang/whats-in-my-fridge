const BASE_URL = "http://localhost:4000";

function getAllIngredients() {
  return fetch(BASE_URL + '/ingredients')
    .then(response => response.json())
}

const exports = {
  getAllIngredients
}

export default exports;