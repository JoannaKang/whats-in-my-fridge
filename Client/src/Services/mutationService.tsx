import { gql } from '@apollo/client';

export const CREATE_SHOPPING_LIST = gql`
  mutation CreateShoppinglist(
    $newShoppinglist: ItemInput!
  ) {
    createShoppingList(input: $newShoppinglist) {
      name
      category
      quantity
      saved
    }
  }
`
;

export const CREATE_MYFRIDGE_LIST = gql`
  mutation CreateMyFridgelist(
    $newMyFridgelist: ItemInput!
  ) {
    createMyFridgeList(input: $newMyFridgelist) {
      name
      category
      quantity
      saved
    }
  }
`
;

export const DELETE_MYFRIDGE_LIST = gql`
  mutation DeleteMyFridgeList($id: String!) {
    deleteMyFridgeList(id: $id) {
      _id
    }
  }
`
;

export const DELETE_SHOPPING_LIST = gql`
  mutation DeleteShoppingList($id: String!) {
    deleteShoppingList(id: $id) {
      _id
    }
  }
`
;