import Buttons from '../Buttons/Buttons'

const IngredientItem = (props) => {

  // console.log('📧', props);

  if (props.ingredientItems === undefined) {
    return null;
  }

  return (
    props.ingredientItems.map(el => {
      return (
        <div key={el._id}>
          <input type="checkbox" onClick={props.clickboxHandler} value={el._id.toString()} ></input>
          {el.name} {el.quantity} {el.date}
        </div>
      )
    })
  )
}

export default IngredientItem