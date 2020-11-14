import react from 'react';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';

import { gql, useQuery } from '@apollo/client'

const getRecipes = gql`
  { 
     meals {
      idMeal
    }
  }
  `


export default () => {
  const { loading, error, data } = useQuery(getRecipes);
  console.log(loading, error, data)
  return <h1>Recipes list</h1>
}