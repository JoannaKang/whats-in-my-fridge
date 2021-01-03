import React from 'react';
import FullRecipe from '../FullRecipe/FullRecipe'
import './MyRecipe.css'
import { useQuery } from '@apollo/client';
import { GET_FULL_MY_RECIPES } from '../../Services/queryServics'
import Loader from '../Loader/Loader'

interface FullIngredient {
  ingredient: string;
  measure: string;
}

function MyRecipe () {
  const {loading, error, data} = useQuery(GET_FULL_MY_RECIPES);
  if (loading) return Loader;
  if (error) return `Error! ${error.message}`;
  const fullRecipe = data.getFullRecipe;
  
  return (
    <>
      {
        fullRecipe.map((el: any) => {
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
        })
      }
    </>
  )
}
  
export default MyRecipe