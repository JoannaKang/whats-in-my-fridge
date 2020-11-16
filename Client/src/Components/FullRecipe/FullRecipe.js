import React, { useState, useEffect } from 'react';
import './FullRecipe.css'


const FullRecipe = (props) => {

  // console.log(props);

  const [state, setState] = useState(false);
  function toggle() {
    setState(!state);
  }
  if (state === false) {
    return <button onClick={toggle}>see detail</button>
  } else {
    return (
      <div className="full-recipe-container" >
        <div>
          {props.fullIngredientInfo}
        </div>
        <div>
          {props.strInstructions}
        </div>
        <button onClick={toggle}>Hide</button>
      </div>

    )
  }

}

export default FullRecipe