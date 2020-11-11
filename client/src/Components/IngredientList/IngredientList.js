function IngredientList(props) {
  console.log(props);
  if (props.ingredients === undefined || props.ingredients === []) {
    return null
  }

  return (

    props.ingredients.map(el => {
      //console.log(el);
      return <p>{el.name} {el.category}</p>
    })

  )
}


export default IngredientList;