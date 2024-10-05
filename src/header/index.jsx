import './index.css';
import logo from '../assets/logo.svg'

export default function Header() {
  return(
    <header>
      <nav className="navbar">
        <a href="#">
          <img src={logo} alt="" />
        </a>
        <ul className="nav-link">
          <li>Frontend</li>
          <li>Backend</li>
          <li>Seguranca da web</li>
          <li>Produtividade</li>
        </ul>
      </nav>
    </header>
  )
}