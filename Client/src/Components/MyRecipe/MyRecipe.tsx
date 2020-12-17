import React, { useState, useEffect } from 'react';
import ApiService from '../../ApiService';
import FullRecipe from '../FullRecipe/FullRecipe'
import './MyRecipe.css'


interface RecipeID {
  _id: string;
  recipeID: string;
}

interface MyRecipeProps {
  MyRecipeList: Array<RecipeID>
}

interface FullRecipeInfo {
  _id: string;
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
}


const MyRecipe = (props: MyRecipeProps) => {

  let [fullRecipeInfo, setFullRecipeInfo] = useState<FullRecipeInfo[]>([]);
 

  useEffect(() => {
    const fetchFunc = async () => {
      const newFullRecipeInfo:FullRecipeInfo[] = [];

      for (let i = 0; i < props.MyRecipeList.length; i++) {
        const res:FullRecipeInfo = await ApiService.getOneRecipe(props.MyRecipeList[i].recipeID)
        newFullRecipeInfo.push(res)
      }

      setFullRecipeInfo(newFullRecipeInfo);

    }
    fetchFunc();
  }, [props.MyRecipeList])

  return (
    fullRecipeInfo.map((el: any) => {

      let fullIngredients_obj = [];

      for (let i = 1; i <= 20; i++) {
        const fullIngredient = {
          ingredient: el[`strIngredient${i}`],
          measure: el[`strMeasure${i}`]
        }
        fullIngredients_obj.push(fullIngredient)
      }

      return (
        <>
          <div className="simple-info" key={el._id} >
            <div className="full-recipe-container">
              <FullRecipe
                fullIngredientInfo={
                  fullIngredients_obj}
                strInstructions={el.strInstructions}
                data={el}
              />
            </div>
          </div>
        </>
      )
    })
  )
}

export default MyRecipe