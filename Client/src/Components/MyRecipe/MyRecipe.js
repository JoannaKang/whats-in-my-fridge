import React, { useState, useEffect } from 'react';
import ApiService from '../../ApiService';
import Button from 'react-bootstrap/Button';
import FullRecipe from '../FullRecipe/FullRecipe'
import './MyRecipe.css'
import { motion } from "framer-motion"
// import Card from 'react-bootstrap/Button';

const MyRecipe = (props) => {

  let [fullRecipeInfo, setFullRecipeInfo] = useState([]);


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

      console.log(el)

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