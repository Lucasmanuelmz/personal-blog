import { ArticlesProvider, useArticles } from '../contextApi/articlesContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './index.css'
import { ArticleProvider, useArticle } from '../contextApi/articleContext';
import { formatDate } from '../components/format';
import { motion } from 'framer-motion';
import { lazy, Suspense,} from 'react';
import AnimationSplash from '../components/animationSplash';
const Loading = lazy(() => import('../pages/loading/index'));

export default function Home() {
  const {page, id} = useParams();
  const articleId = id || 2
  return(
    <ArticlesProvider page={page}>
      <ArticleProvider id={articleId}>
      <Suspense fallback={<Loading />}>
     <HomePage />
     </Suspense>
     </ArticleProvider>
    </ArticlesProvider>
  )
}

export function HomePage() {
  const {articles, loading, hasNextPage} = useArticles();
  const {article} = useArticle();
  const {page, id} = useParams();
  const navigate = useNavigate();
  const currentPage = parseInt(page) || 2;

  const goToNextPage = () => {
    if (hasNextPage) {
    navigate(`/slug/${currentPage + 1}/articles/${id}`);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      navigate(`/slug/${currentPage - 1}/articles/${id}`);
    }
  };

  if (loading) {
    return(
      <div style={{
        width:'100%',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <AnimationSplash />
      </div>
    ) ;
  }

  return(
    <Suspense fallback={<Loading/>}>
    <main>
     {article && (
      <section className="container"> 
        <h1>{article.article}</h1>
        <Link className='link' to={`/article/${article.id}`}>
        <motion.div
      className="big-card"> 
          <img src={article.url} alt={article.title} />
          <div style={{backgroundColor: 'transparent'}} className='commer'>
            Publicado em:
          <div>| {formatDate(article.createdAt)} |</div>
          <span></span>
              <div style={{color: 'orangered'}}>{article.category? article.category.name: null}</div>
        </div>
      </motion.div>
        </Link>
      </section>
      )}
      <section className="container">
      { articles && articles.length > 0 && (
        <div className="card-container">
          {articles.map(article => (
         <motion.div
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 1 }}
         drag="x"
         dragConstraints={{ left: -100, right: 100 }} key={article.id}
          className="card">
            <img src={article.url} alt={article.title} className="card-image" />
            <div>
              <div className='commer'>
                <div>
                {formatDate(article.createdAt)}
              </div>
              <span></span>
              <div style={{color: 'orangered'}}>{article.category? article.category.name: null}</div>
              </div>
              <h4><Link className='link' to={`/articles/slug/${article.slug}`}>{article.title}</Link></h4>
            </div>
          </motion.div>   
          ))}
        </div>
      )}
      <div className="pagination-buttons">
          <motion.button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="link-auth"
          >
            Anterior
          </motion.button>

          <motion.button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="link-auth"
          >
            Próximo
          </motion.button>
        </div>
        <form action="#" className="form">
          <h3>Envie nos uma mensagem para obter mais informacoes</h3>

          <label htmlFor="name">Nome:
          <input type="text" name='name' id='name' />
          </label>
          <label htmlFor="email">Email:
          <input type="email" name='email' id='email' />
          </label>
          <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className='link-auth'>Enviar</motion.button>
        </form>
      </section>
    </main>
    </Suspense>
  )
}