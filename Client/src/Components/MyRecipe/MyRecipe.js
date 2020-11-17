import React, { useState, useEffect } from 'react';
import ApiService from '../../ApiService';
import Button from 'react-bootstrap/Button';
import FullRecipe from '../FullRecipe/FullRecipe'
// import Card from 'react-bootstrap/Button';

const MyRecipe = (props) => {

  let [fullRecipeInfo, setFullRecipeInfo] = useState([]);
  let fullIngredientInfo = [];

  useEffect(() => {
    const fetchFunc = async () => {
      const newFullRecipeInfo = [];

      for (let i = 0; i < props.MyRecipeList.length; i++) {
        const res = await ApiService.getOneRecipe(props.MyRecipeList[i].recipeID)
        newFullRecipeInfo.push(res)
      }

      setFullRecipeInfo(newFullRecipeInfo);

    }
    fetchFunc();
  }, [props.MyRecipeList])

  return (
    fullRecipeInfo.map(el => {

      let fullIngredients_obj = [];

      for (let i = 1; i <= 20; i++) {
        const fullIngredient = {
          ingredient: el[`strIngredient${i}`],
          measure: el[`strMeasure${i}`]
        }
        fullIngredients_obj.push(fullIngredient)
      }

      fullIngredients_obj = fullIngredients_obj.filter(el => el.ingredient !== null).filter(el => el.ingredient !== "");

      for (let i = 0; i < fullIngredients_obj.length; i++) {
        fullIngredientInfo = <>{fullIngredients_obj[i].ingredient}  {fullIngredients_obj[i].measure}</>
      }




      return (
        <>
          <div key={el._id} >

            <div className="simpleinfo-container" >
              {/* <Card > */}
              <img src={el.strMealThumb} width="100"></img>
              {el.strMeal}
            </div>

            <FullRecipe
              fullIngredientInfo={
                fullIngredientInfo}
              strInstructions={el.strInstructions}
            />
          </div>
        </>
      )
    })
  )
}

export default MyRecipe