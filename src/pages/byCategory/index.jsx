import {FindCategoriesProvider, useCategories } from "../../contextApi/categoryFindOne";
import { Link, useParams } from "react-router-dom"; 
import { formatDate } from "../../components/format"; 
import { motion } from "framer-motion";

export function CategoriesFindArticle() {
  const {slug} = useParams()
  return(
    <FindCategoriesProvider slug={slug}>
      <FilterByCategory/>
    </FindCategoriesProvider>
  )
}

export default function FilterByCategory() {
  const { categories } = useCategories();

  return (
    <main>
       <section style={{border: 'none'}} className="container">
      { categories && categories.length > 0 && (
        <div className="card-container">
          {categories.map(article => (
         <motion.div whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 1.1 }}
         drag="x"
         dragConstraints={{ left: -100, right: 100 }} key={article.id} className="card">
            
            <img src={article.url} alt={article.title} className="card-image" />
            <div>
              <div className='commer'><div>{formatDate(article.createdAt)}</div><span></span>{article.category? article.category.name: null}</div>
              <h4><Link className='link' to={`/article/${article.id}`}>{article.title}</Link></h4>
            </div>
          </motion.div>   
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
