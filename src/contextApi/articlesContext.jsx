import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ArticlesContext = createContext();

export function ArticlesProvider({page, children}) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/articles/${page}`)
    .then(response => {
      const articles = response.data.articles;
      setHasNextPage(response.data.next);
        setLoading(false);
      setArticles(articles);
    })
    .catch(error => {
      setLoading(false);
      console.log(error.message)
    })
  },[page])

  return(
    <ArticlesContext.Provider value={{articles, loading, hasNextPage}}>
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
  page: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}