import React, { useState, useEffect } from 'react';
import ApiService from '../../ApiService';
import FullRecipe from '../FullRecipe/FullRecipe'
import './MyRecipe.css'
import {FullRecipeInfo} from '../../Interfaces'

interface MyRecipeList {
  _id: string,
  recipeID: string
}


interface MyRecipeProps {
  MyRecipeList: Array<MyRecipeList>
}

interface FullIngredient {
  ingredient: string;
  measure: string;
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
    <>
    {fullRecipeInfo.map((el: any) => {

      let fullIngredients_obj:FullIngredient[] = [];

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
    })}
  </>)
}

export default MyRecipe