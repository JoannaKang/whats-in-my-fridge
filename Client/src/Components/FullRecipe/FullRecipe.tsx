import React, { useState, useEffect } from 'react';
import './FullRecipe.css'
import {FullRecipeInfo} from '../../Interfaces'

interface ingredient {
  ingredient: string;
  measure: string;
}

interface FullRecipeProps {
  fullIngredientInfo: Array<ingredient>;
  data: FullRecipeInfo;
  strInstructions: string;
}

const FullRecipe = (props: FullRecipeProps) => {

  const [state, setState] = useState(false);

  function toggle() {
    setState(!state);
  }

  const fullIngredients_obj:ingredient[] = props.fullIngredientInfo.filter(el => el.ingredient !== null).filter(el => el.ingredient !== "");

  let fullIngredientInfo = [];

  for (let i = 0; i < fullIngredients_obj.length; i++) {
    fullIngredientInfo.push(fullIngredients_obj[i].ingredient)
    fullIngredientInfo.push(fullIngredients_obj[i].measure)
  }

  const fullIngredientInfoStr = fullIngredientInfo.join();

  return (
    <>
      <div className="toggle-div" onClick={() => toggle()}>
        <img className="thumbnail" src={props.data.strMealThumb} width="100"></img>
        <div className="text-area">
          <div className="recipe-name">  {props.data.strMeal}</div> <div className="recipe-category"> 🥘 {props.data.strCategory}</div> <div className="area">📍{props.data.strArea}</div>
        </div>
      </div>
      <div className={`full-recipe-subcontainer ${!state ? "collapsed" : ""} `}>
        <div className="full-recipe-ingredients">
          <h3 className="whole-ingredients">🧺  Whole Ingredients</h3>
          {fullIngredientInfoStr}
        </div>
        <div className="full-recipe-instruction">
          <h3 className="instruction">📝 Detail Instruction</h3>
          <ol>
            {props.data.strInstructions.split('\n').map(function (item, key) {
              return (
                <span key={key}>
                  <li>{item}</li>
                  <br />
                </span>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )

}

export default FullRecipe