import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ArticlesContext = createContext();

export function ArticlesProvider({children}) {
  const [articles, setArticles] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
    .then(response => {
      const articles = response.data.articles;
      setArticles(articles);
    })
    .catch(error => {
      console.log(error.message)
    })
  },[])

  return(
    <ArticlesContext.Provider value={{articles, setArticles}}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if(!context) {
    throw new Error('Nao foi possivel obter artigos')
  }
  return context;
};

ArticlesProvider.propTypes = {
  children: PropTypes.node.isRequired
}