
const IngredientItem = (props) => {
  if (props.ingredientItems === undefined) {
    return null;
  }

  return (
    props.ingredientItems.map(el => {
      return (
        <div key={el._id}>
          {el.category} {el.name}
        </div>
      )
    })
  )
}

export default IngredientItem