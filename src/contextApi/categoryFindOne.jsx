import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const FindCategoriesContext = createContext();

export function FindCategoriesProvider({ slug, children }) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/categories/${slug}`)
      .then(response => {
        setCategories(response.data.articles);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [slug]);

  return (
    <FindCategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </FindCategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(FindCategoriesContext);
  if (!context) {
    throw new Error('Não foi possível carregar as categorias');
  }
  return context;
}

FindCategoriesProvider.propTypes = {
  slug: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
