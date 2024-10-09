import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ReadArticleContext = createContext();

export function ReadArticleProvider({id, children}) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/articles/${id}`)
    .then((response) => {
      const article = response.data.article;
      setArticle(article);
    })
    .catch(error => {
      console.log(error.message)
    })
  },[id])

  return(
    <ReadArticleContext.Provider value={{article, setArticle}} >
      {children}
    </ReadArticleContext.Provider>
  )
}

export function useArticle() {
  const context = useContext(ReadArticleContext);
  if(!context) {
    throw new Error('Nao foi possivel obter o artigo')
  }
  return context;
}

ReadArticleProvider.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}