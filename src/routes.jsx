import { createBrowserRouter } from "react-router-dom";
import App from './App';
import HomePage from "./pages";
import CreateArticle from "./pages/createArticle";

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
      }
    ]
  },
]);

export default router;