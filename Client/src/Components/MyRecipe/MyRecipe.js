import React, { useState, useEffect } from 'react';
import ApiService from '../../ApiService';

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
  }, [])
  console.log(fullRecipeInfo);

  return (
    fullRecipeInfo.map(el => {
      console.log(el)
      return (
        <div key={el._id}>
          <img src={el.strMealThumb} width="100"></img>
          {el.strMeal}
        </div>
      )
    })
  )
}

export default MyRecipe