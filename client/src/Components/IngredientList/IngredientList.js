function IngredientList(props) {
  if (props.ingredients === undefined || props.ingredients === []) {
    return null
  }

  if (props.length === 0) {
    return (
      <p>Add new Shopping List</p>
    )
  } else {
    return (
      props.ingredients.map(el => {
        return <p key={el._id}>{el.name} {el.category}</p>
      })
    )
  }

}


export default IngredientList;