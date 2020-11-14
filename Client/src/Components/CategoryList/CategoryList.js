import IngredientItem from '../IngredientItem/IngredientItem'
import Button from '../Buttons/Buttons'

const CategoryList = (props) => {

  if (props.listitems.length === 0) {
    return null;
  }

  // console.log('CategoryList', props);

  const AllList = props.listitems.flatMap(el => el)

  const VeggiesList = AllList.filter(el => el.category === "Veggies");
  const MeatList = AllList.filter(el => el.category === "Meat");
  const FishList = AllList.filter(el => el.category === "Fish");
  const DairyList = AllList.filter(el => el.category === "Dairy");
  const BakeryList = AllList.filter(el => el.category === "Bakery");
  const DessertList = AllList.filter(el => el.category === "Dessert");
  const SauceList = AllList.filter(el => el.category === "Sauce");
  const SpiceList = AllList.filter(el => el.category === "Spice");
  const etcList = AllList.filter(el => el.category === "etc");


  return (
    <>
      <div className="category-container">
        <div><h1>Veggies</h1></div>
        <IngredientItem
          ingredientItems={VeggiesList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Meat</h1></div>
        <IngredientItem
          ingredientItems={MeatList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Fish</h1></div>
        <IngredientItem
          ingredientItems={FishList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Dairy</h1></div>
        <IngredientItem
          ingredientItems={DairyList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Bakery</h1></div>
        <IngredientItem
          ingredientItems={BakeryList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Dessert</h1></div>
        <IngredientItem
          ingredientItems={DessertList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Sauce</h1></div>
        <IngredientItem
          ingredientItems={SauceList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>Spice</h1></div>
        <IngredientItem
          ingredientItems={SpiceList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
        <div><h1>etc</h1></div>
        <IngredientItem
          ingredientItems={etcList}
          clickboxHandler={props.clickboxHandler}
          checkedItems={props.checkedItems}
          setCheckedItems={props.setCheckedItems} />
      </div>

      <Button
        listitems={props.listitems}
        setMyShoppingList={props.setMyShoppingList}
        setMyfridgeList={props.setMyfridgeList}
        fetchMyFridgeList={props.fetchMyFridgeList}
        fetchShoppinglist={props.fetchShoppinglist}
        clickboxHandler={props.clickboxHandler}
        checkedItems={props.checkedItems}
        setCheckedItems={props.setCheckedItems}
      />
    </>
  )


}

export default CategoryList