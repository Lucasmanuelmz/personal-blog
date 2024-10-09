import { useArticles } from '../contextApi/articlesContext';
import { Link } from 'react-router-dom';
import './index.css'
import { useArticle } from '../contextApi/articleContext';
import { formatDate } from '../components/format';
import { motion } from 'framer-motion';

export default function HomePage() {
  const {articles} = useArticles();
  const {article} = useArticle();

  return(
    <main>
     {article &&(
      <section className="container">
       
        <h1>{article.article}</h1>
        <Link className='link' to={`/article/${article.id}`}>
        <motion.div
      className="big-card"> 
          <img src={article.url} alt={article.title} />
          <div>
          <span>{formatDate(article.createdAt)}</span>
        </div>
      </motion.div>
        </Link>
      </section>
      )}
      <section className="container">
      { articles && articles.length > 0 && (
        <div className="card-container">
          {articles.map(article => (
         <motion.div whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 1.1 }}
         drag="x"
         dragConstraints={{ left: -100, right: 100 }} key={article.id} className="card">
            <img src={article.url} alt={article.title} className="card-image" />
            <div>
              <div className='commer'><div>{formatDate(article.createdAt)}</div>
              <span></span>
              <div>{article.category? article.category.name: null}</div>
              </div>
              <h4><Link className='link' to={`/article/${article.id}`}>{article.title}</Link></h4>
            </div>
          </motion.div>   
          ))}
        </div>
      )}
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
  )
}