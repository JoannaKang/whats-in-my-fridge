function RecipeList(props) {

  if (props.Recipeitems === undefined) {
    return null;
  }


  return (
    props.Recipeitems.map(el => {
      return (
        <div key={el._id}>
          <img src={el.strMealThumb} width="100"></img>
          {el.strMeal}
        </div>
      )
    })
  )


}


export default RecipeList;