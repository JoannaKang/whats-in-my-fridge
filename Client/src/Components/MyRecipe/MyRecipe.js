import React from 'react';
import RecipeList from '../RecipeList/RecipeList'

const MyRecipe = (props) => {

  if (props.Recipeitems === undefined) {
    return null;
  }


  return (
    <>
      <h1>My Recipe</h1>
      <RecipeList
        Recipeitems={props.Recipeitems}
        setRecipeitems={props.setRecipeitems}
        fetchRecipes={props.fetchRecipes} />
    </>
  )

}

export default MyRecipe