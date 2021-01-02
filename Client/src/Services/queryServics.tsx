import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query {
    getMyFridgeItems {
      _id
      name
      category
      quantity
      saved
      date
    }
    getShoppingList {
      _id
      name
      category
      quantity
      saved
      date
      }
  }
`

export const GET_ONE_FRIDGE_ITEM = gql`
    query GetOneMyFridgeItem(
      $id: String!
      ){
      getOnegetMyFridgeItem(id: $id) {
        _id
        name
        category
        quantity
        saved
        date
      }
    }  
` 

