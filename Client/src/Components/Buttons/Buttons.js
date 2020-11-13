import ApiService from '../../ApiService'

const Button = (props) => {


  if (props.listitems === undefined) {
    return null;
  }


  const shoppinglistHandler = async (e) => {
    console.log('🌽', props.checkedItems)

    await props.checkedItems.map(el =>
      ApiService.getOneMyFridgeItem(el)
        .then((res) => {
          // console.log('RESSSSS', res.name, res.category, res.quantity, res.saved)
          const movedItem = Object.assign({}, { name: res.name, category: res.category, quantity: res.quantity })
          return movedItem
        })
        .then((res) => {
          const movedItem = [];
          movedItem.push(res)
          return movedItem
        })
        .then((res) => {
          ApiService.saveShoppingList(res);
          //FIXME: why is not Shoppinglist fetching again??
        })
    );

    await props.checkedItems.map(el => {
      const removedFromFridge = []
      removedFromFridge.push(el)
      ApiService.deleteMyFridgeItems(removedFromFridge);
    })

    ApiService.getShoppingList();
  }

  const inmyfridgeHandler = async () => {
    console.log('🍖', props.checkedItems)
    await ApiService.deleteMyFridgeItems(props.checkedItems);
    //FIXME: why is not fetch myfridgelist again??
    props.fetchMyFridgeList();
  }

  console.log('in button', props);

  if (props.listitems[0].saved === "Fridge") {
    return (
      <>
        <button onClick={shoppinglistHandler}>Add to shopping list</button>
        <button onClick={inmyfridgeHandler}>Delete</button>
      </>
    )
  } else if (props.listitems[0].saved === "ShoppingList") {
    return (
      <>
          //TODO: Delete 핸들러 구현
          //TODO: Move to my Fridge 핸들러 구현
        <button>Move to My Fridge</button>
        <button>Delete</button>
      </>
    )
  }

  // return (
  //   <button></button>
  // )

}

export default Button