import './index.css';
import logo from '../assets/logo.svg'
import { useCategories } from '../contextApi/categoryContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
  const {categories} = useCategories();
  return(
    <header>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="nav-container">
        {categories && categories.length > 0 && (
        <ul className="nav-link">
          {categories.map(category => (
           <li key={category.id}>
            <Link to={`/articles/category/${category.slug}`}>{category.name}</Link>
           </li> 
          ))}
        </ul>
        )}
      <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className='link-auth'>
        <Link to='#' >Login</Link>
      </motion.button> 
      <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className='link-auth'>
        <Link to='#'>Sign up</Link>
        </motion.button>
        </div> 
      </nav>
    </header>
  )
}