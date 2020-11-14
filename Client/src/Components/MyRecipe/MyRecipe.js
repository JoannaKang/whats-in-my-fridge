import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Client from './Apollo'

import RecipeList from '../RecipeList/RecipeList'



const MyRecipe = () => {

  return (
    <>
      <h1>My Recipe</h1>
      <ApolloProvider client={Client}>
        <RecipeList />
      </ApolloProvider>
    </>
  )

}

export default MyRecipe