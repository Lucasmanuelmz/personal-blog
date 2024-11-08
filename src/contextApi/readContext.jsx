import axios from "axios";
import PropTypes from "prop-types";
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";

const ReadArticleContext = createContext();

export function ReadArticleProvider({slug, children}) {
  const [readArticle, setReadArticle] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  console.log(`O slug recebido esta aqui: ${slug}`)
 
  useEffect(() => {
    function fetchArticle() {
      setLoading(true);
      setError(null);
        axios.get(`http://localhost:5000/articles/slug/${slug}`)
        .then(response => {
          if(response.status === 200) {
          setReadArticle(response.data.article);
        }
        })
       
       .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Requisição cancelada:", error.message);
        } else {
          setError("Erro ao carregar o artigo.");
        }
      })
      .finally(() => {
         setLoading(false);
      })
    };

    fetchArticle();
  }, [slug]);

  return (
    <ReadArticleContext.Provider value={{ readArticle, loading, error, setReadArticle }}>
      {children}
    </ReadArticleContext.Provider>
  );
}

export function useReadArticle() {
  const context = useContext(ReadArticleContext);
  if (!context) {
    throw new Error('Não foi possível obter o artigo');
  }
  return context;
}

ReadArticleProvider.propTypes = {
  slug: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

