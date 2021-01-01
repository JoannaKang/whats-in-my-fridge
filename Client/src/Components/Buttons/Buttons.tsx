import ApiService from '../../ApiService'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Buttons.css';
import {Myfridgelist} from '../../Interfaces';

import { useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../../Services/queryServics';
import {CREATE_SHOPPING_LIST, DELETE_MYFRIDGE_LIST} from '../../Services/mutationService'


interface ButtonProps {
  checkedItems: Array<string>;
  clickboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //fetchMyFridgeList: () =>  Promise<void>;
  //fetchShoppinglist: () => void;
  listitems: Array<Myfridgelist>;
  setCheckedItems: (value: Array<string>) => void;
  //setMyShoppingList: (value: Array<Myfridgelist>) => void;
  //setMyfridgeList: (value: Array<Myfridgelist>) => void;
}

interface Item {
  name:string;
  category: string;
  quantity: number;
  saved: string;
}

function Button (props:ButtonProps) {

  const [mutation, setMutation] = useState<Item>([]);
  
  const [createShoppinglist] = useMutation(CREATE_SHOPPING_LIST, {refetchQueries:[{query: GET_USER_DATA}]});
  const [deleteMyfridgelist] = useMutation(DELETE_MYFRIDGE_LIST, {refetchQueries:[{query: GET_USER_DATA}]});

  const getCheckedItemInfo = async () => {
    let movedItemArray:Item[] = [];
    console.log('🥰🥰🥰🥰🥰🥰', props.checkedItems);
    
    for (let i = 0; i < props.checkedItems.length; ++i) {
      const el = await props.checkedItems[i];
      let res = await ApiService.getOneMyFridgeItem(el);
      const {name, category, quantity} = res.data.getOnegetMyFridgeItem

      const movedItem:Item = Object.assign({}, { name: name, category: category, quantity: quantity, saved: "ShoppingList" })
      movedItemArray.push(movedItem);
    }
    setMutation(movedItemArray);
  }
  
  useEffect(() => {
    getCheckedItemInfo()
  }, [props.checkedItems])

  async function addToShoppingList () {
    for (let i = 0; i < mutation.length; i++) {
      await createShoppinglist({
        variables: {newShoppinglist: mutation[i]}
      });
    }

    for (let i = 0; i < props.checkedItems.length; i++) {
      await deleteMyfridgelist({
        variables: {id: props.checkedItems[i]}
      });
    }
    props.setCheckedItems([]);
  }


  const fridgeFragment:JSX.Element = <div className="button-div-1">
  <button className="add-to-shoppinglist" onClick={() => {addToShoppingList()}}><Link to="/shoppinglist" style={{ color: 'black', textDecoration: 'inherit' }}>Add to shopping list</Link></button>
  <button className="delete" onClick={() => {deleteMyfridgelist()}}>Delete</button>
  </div>

  // const shoppingListFragment:JSX.Element =  <div className="button-div">
  // <button className="move-to-myfridge" onClick={movetoMyFridge}><Link to="/inmyfridge">Move to My Fridge</Link></button>
  // {/* <button className="delete" onClick={deleteShoppinglist}>Delete</button> */}
  // </div>

  
  
  return (
    <>
      {fridgeFragment}
    </>
  )
}

// const Button = (props:ButtonProps) => {

//   const addtoShoppinglist = async () => {
//     props.setCheckedItems([]);
//     let movedItemArray:Item[] = [];
//     for (let i = 0; i < props.checkedItems.length; ++i) {
//       const el = props.checkedItems[i];
//       let res = await ApiService.getOneMyFridgeItem(el);
//       console.log('getonemyfridgeitem', res.data.getOnegetMyFridgeItem);

//       const {name, category, quantity} = res.data.getOnegetMyFridgeItem

//       const movedItem:Item = Object.assign({}, { name: name, category: category, quantity: quantity, saved: "ShoppingList" })
//       movedItemArray.push(movedItem);
//     }
// //TODO: change into mutation query to save shopping list
    
//     // await ApiService.saveShoppingList(movedItemArray);

  
    
//     for (let i = 0; i < movedItemArray.length; i++) {
//       const { name, category, quantity, saved } = movedItemArray[i];
//       const res = await CreateShoppinglist({
//         variables: { name, category, quantity, saved }
//       })

//       console.log('🤬🤬🤬🤬🤬', res);
      
//     }

//     let removedFromFridge:Array<string> = []
//     props.checkedItems.map(el => {
//       return removedFromFridge.push(el)
//     })
//     await ApiService.deleteMyFridgeItems(removedFromFridge);


//     //props.fetchMyFridgeList();
//     //props.fetchShoppinglist();
//   }

//   const deleteMyfridgeItem = async () => {
//     await ApiService.deleteMyFridgeItems(props.checkedItems);
//     //props.fetchMyFridgeList();
//   }

//   const movetoMyFridge = async () => {
//     props.setCheckedItems([]);
//     console.log(props.checkedItems)

//     let movedItemArray = [];

//     for (let i = 0; i < props.checkedItems.length; i++) {
//       const el = props.checkedItems[i];
//       let res = await ApiService.getOneShoppingList(el);

//       const movedItem = Object.assign({}, { name: res.name, category: res.category, quantity: res.quantity })
//       movedItemArray.push(movedItem);
//     }

//     await ApiService.saveMyfridgeList(movedItemArray);

//     let removedFromShoppinglist:Array<string> = [];
//     props.checkedItems.map(el => {
//       return removedFromShoppinglist.push(el)
//     })
//     await ApiService.deleteShoppingList(removedFromShoppinglist);

//     //props.fetchMyFridgeList();
//     //props.fetchShoppinglist();
//   }

//   const deleteShoppinglist = async () => {
//     await ApiService.deleteShoppingList(props.checkedItems);
//     //props.fetchShoppinglist();
//   }

//   const fridgeFragment:JSX.Element = <div className="button-div-1">
//   <button className="add-to-shoppinglist" onClick={addtoShoppinglist}><Link to="/shoppinglist" style={{ color: 'black', textDecoration: 'inherit' }}>Add to shopping list</Link></button>
//   <button className="delete" onClick={deleteMyfridgeItem}>Delete</button>
// </div>

//   const shoppingListFragment:JSX.Element =  <div className="button-div">
//   <button className="move-to-myfridge" onClick={movetoMyFridge}><Link to="/inmyfridge">Move to My Fridge</Link></button>
//   <button className="delete" onClick={deleteShoppinglist}>Delete</button>
// </div>

//   const CreateShoppinglist = ({ItemInput}:Item) =>{
//     const [createShoppinglist] = useMutation<{createShoppinglist:Item}>(CREATE_SHOPPING_LIST)
//   }


//   let returnFragment = null;
//   if (props.listitems.length > 0) {
//     if (props.listitems[0].saved === "Fridge") {
//       returnFragment = fridgeFragment;
//     } else if (props.listitems[0].saved === "ShoppingList") {
//       returnFragment = shoppingListFragment;
//     }
//   };


//   return (    
//     <>
//       {returnFragment}
//     </>
//   );

// }

export default Button