import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ArticleContext = createContext();

export function ArticleProvider({id, children}) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/id/${id}`)
    .then((response) => {
      const article = response.data.article;
      setArticle(article);
    })
    .catch(error => {
      console.log(error.message)
    })
  },[id])

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
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}