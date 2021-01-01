import { gql } from '@apollo/client';

export const CREATE_SHOPPING_LIST = gql`
  mutation CreateShoppinglist(
    $newShoppinglist: ItemInput!
  ) {
    createShoppinglist(input: $newShoppinglist) {
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