import './index.css';
import logo from '../assets/logo.svg';
import { useCategories } from '../contextApi/categoryContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { CiCircleMore } from "react-icons/ci";

export default function Header() {
  const { categories } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowmenu] = useState('nav-mobile')

  function toggleMenu() {
    setIsMenuOpen(prevState => !prevState);
    setShowmenu('nav-none')
  };

 function showMobile() {
  if(showMenu === 'nav-none') {
    setShowmenu('nav-mobile')
  } else {
    setShowmenu('nav-none')
  }
 }

  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="nav-container">
          {categories && categories.length > 0 && (
            <ul  className="nav-link">
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
            <Link to='/login'>Login</Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='link-auth'>
            <Link to='/signup'>Sign up</Link>
          </motion.button>
        </div>
        <div onClick={toggleMenu} className="menu-hamburger" aria-label="Toggle Menu" role="button">
          {isMenuOpen ? <IoMdClose size={30} /> : <GiHamburgerMenu size={30} />}
        </div>
      </nav>
      <div className="control">
        <div className={`mobile-menu ${isMenuOpen ? '' : 'invisible-mobile'}`}>
          <div className='m-none' onClick={showMobile}>
            <CiCircleMore size={30} />
          </div>
           <div className='ul-link'>
          {categories && categories.length > 0 && (
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/articles/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          )}
          </div>
          <div className='button-card'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='link-auth'>
              <Link to='/login'>Login</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='link-auth'>
              <Link to='/signup'>Sign up</Link>
            </motion.button>
          </div>
        </div>
      </div>
      <div className={`${showMenu}`}>
          {categories && categories.length > 0 && (
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/articles/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          )}
          </div>
    </header>
  );
}
