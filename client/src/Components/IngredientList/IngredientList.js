import react from 'react';

function IngredientList(props) {
  props.ingredientlist()
  console.log(props.ingredients);
  return (
    <>
      <h1>hello I'm Ingredient List</h1>
      <p>{props.ingredients[0]}</p>
    </>
  )
}


export default IngredientList;