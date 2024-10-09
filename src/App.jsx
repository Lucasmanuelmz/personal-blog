import { Outlet } from 'react-router-dom'
import './App.css';
import { lazy, Suspense} from 'react';
import Loading from './pages/loading';
const Footer = lazy(()=> import('./footer'));
const Header = lazy(()=> import('./header')) ;

function App() {
  return (
    <div>
      <Suspense fallback= {<Loading />}>
    <Header />
     <Outlet />
     <Footer />
    </Suspense>
   
    </div>
  )
}

export default App
