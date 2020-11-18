import ApiService from '../../ApiService'
import './RecipeList.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
    for (let i = 0; i < 5; i++) {
      let randomIndex = getRandomInt(0, recipeIdArray.length - 1);

      const recipe = await ApiService.getOneRecipe(recipeIdArray[randomIndex]);
      recipeInfos.push(recipe);
    }
    return recipeInfos;
  }

  // FIXME:클릭된 카테고리의 레시피만 다시 가져오기
  const getMoreRecipe = (e) => {
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
            <div key={recipe._id} className="Recipe-info">
              <div>
                <h3 className="recipe-area">{recipe.strArea}</h3>
                <img src={recipe.strMealThumb} width="100%"></img>
                <h5>{recipe.strMeal}</h5>
              </div>
              <button className="save-to-myrecipe" onClick={saveMyRecipe} value={recipe._id}>
                <Link to='/myrecipe'>Save to my Recipe</Link></button>
            </div>
          </>)
      })
      return (
        <>
          <div className="Ingredient-category-container">
            <span><h2 className="ingredient-name">{el.ingredient}</h2>
              <button className="get-more-recipes" onClick={getMoreRecipe} value={el.ingredient}>
                <FontAwesomeIcon icon={faPlus} /> Get more recipes</button></span>
            <div className="recipe-array">
              {recipe_array}
            </div>
          </div>
        </>
      )
    })
  )
}


export default RecipeList;