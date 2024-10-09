import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {PropTypes} from 'prop-types';

const CategoriesContext = createContext();

export function CategoriesProvider({children}) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/articles/categories')
    .then(response => {
      const categories = response.data.categories;
      setCategories(categories)
    })
    .catch(error => {
      console.log(error.message)
    })
  },[]);

  return(
    <CategoriesContext.Provider value={{categories, setCategories}}>
      {children}
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if(!context) {
    throw new Error('Nao foi possiver carregar as categorias');
  }
  return context
} 

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired
}