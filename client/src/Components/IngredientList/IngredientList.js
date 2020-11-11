function IngredientList(props) {

  if (props.ingredients === undefined) {
    return null
  }

  return (
    props.ingredients.map(el => {
      console.log(el);
      return <p key={el}>{el}</p>
    })
  )
}


export default IngredientList;