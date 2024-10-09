import { createBrowserRouter } from "react-router-dom";
import App from './App';
import HomePage from "./pages";
import CreateArticle from "./pages/createArticle";
import { ReadPage } from "./pages/readArticle";
import { CategoriesFindArticle } from "./pages/byCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'articles',
        element: <CreateArticle />
      },
      {
        path: 'article/:id',
        element: <ReadPage />
      },
      {
        path: '/articles/category/:slug',
        element: <CategoriesFindArticle/>
      }
    ]
  },
]);

export default router;