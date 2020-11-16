import ApiService from '../../ApiService'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function RecipeList(props) {
  // console.log(props);
  const [fullrecipes, setFullrecipes] = useState([])

  const getRecipeInfo = async (recipeIdArray) => {
    let recipeInfos = [];
    for (let i = 0; i < 3; i++) {
      let randomIndex = getRandomInt(0, recipeIdArray.length - 1);

      const recipe = await ApiService.getOneRecipe(recipeIdArray[randomIndex]);
      recipeInfos.push(recipe);
    }
    return recipeInfos;
  }

  const getMoreRecipe = () => {
    props.getRecipeHandler()
  }

  const saveMyRecipe = (e) => {
    const selectedRecipies = []
    selectedRecipies.push(e.target.value)
    ApiService.saveMyRecipe(selectedRecipies);
  }


  useEffect(() => {
    async function getRandomRecipes() {
      let new_fullrecipes = [];
      console.log(props.requestedRecipe);
      for (let i = 0; i < props.requestedRecipe.length; ++i) {
        const name = props.requestedRecipe[i].ingredient;
        const recipes = await getRecipeInfo(props.requestedRecipe[i].recipes);
        new_fullrecipes.push({ ingredient: name, recipes: recipes });
      }
      setFullrecipes(new_fullrecipes);
    }

    getRandomRecipes()

  }, [props.requestedRecipe]);


  return (
    fullrecipes.map(el => {
      let recipe_array = [];
      el.recipes.forEach((recipe) => {
        recipe_array.push(
          <>
            <div key={recipe._id}>
              <img src={recipe.strMealThumb} width="100"></img>
              {recipe.strArea} {recipe.strMeal}
              <button onClick={saveMyRecipe} value={recipe._id}><Link to='/myrecipe'>Save to my Recipe</Link></button>
            </div>
          </>)
      })
      return (
        <>
          <h1>{el.ingredient}</h1>
          {recipe_array}
          <button onClick={getMoreRecipe} value={el.ingredient}>Get more recipes</button>
        </>
      )
    })
  )
}


export default RecipeList;