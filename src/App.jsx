import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './footer'
import Header from './header';

function App() {
  return (
    <div>
     <Header />
     <Outlet />
     <Footer />
    </div>
  )
}

export default App
