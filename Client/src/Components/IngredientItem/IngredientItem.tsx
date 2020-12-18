import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './IngredientItem.css'

interface IngredientItem {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    saved: string;
    date: string;
    __v:string;
}

interface IngredientItemProps {
  ingredientItems: Array<IngredientItem>
  clickboxHandler: React.FormEventHandler;
}

const IngredientItem = (props: IngredientItemProps) => {

  // console.log('📧', props);

  // if (props.ingredientItems === undefined) {
  //   return null;
  // }

  return (
    props.ingredientItems.map(el => {
      return (
        <div key={el._id} className="item-div">
          <input type="checkbox" className="checkbox"
            onClick={props.clickboxHandler}
            value={el._id.toString()} >
          </input>
          <div className="detail">
            <span>{el.name}</span>
            <span><FontAwesomeIcon className="plus" icon={faPlus} color={"grey"} size="xs"></FontAwesomeIcon> {el.quantity} <FontAwesomeIcon className="minus" icon={faMinus} size="xs" color={"grey"}></FontAwesomeIcon></span>
          </div>
        </div >
      )
    })
  )
}

export default IngredientItem