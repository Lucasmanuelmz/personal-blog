import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Home from "./pages";
import CreateArticle from "./pages/createArticle";
import { ReadPage } from "./pages/readArticle";
import { CategoriesFindArticle } from "./pages/byCategory";
import ErrorComponent from "./components/errorComponent";
import Login from "./auth/login";
import Signup from "./auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'slug/:page/articles/:id',
        element: <Home />
      },
      {
        path: 'articles',
        element: <CreateArticle />
      },
      {
        path: 'articles/slug/:slug',
        element: <ReadPage />
      },
      {
        path: '/articles/category/:slug',
        element: <CategoriesFindArticle/>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },
]);

export default router;