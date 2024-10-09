import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ArticleContext = createContext();

export function ArticleProvider({children}) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/2`)
    .then((response) => {
      const article = response.data.article;
      setArticle(article);
    })
    .catch(error => {
      console.log(error.message)
    })
  },[])

  return(
    <ArticleContext.Provider value={{article, setArticle}} >
      {children}
    </ArticleContext.Provider>
  )
}

export function useArticle() {
  const context = useContext(ArticleContext);
  if(!context) {
    throw new Error('Nao foi possivel obter o artigo')
  }
  return context;
}

ArticleProvider.propTypes = {
  children: PropTypes.node.isRequired
}