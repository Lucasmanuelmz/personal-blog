import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import './index.css'
import { CategoriesProvider } from './contextApi/categoryContext';
import { ArticlesProvider } from './contextApi/articlesContext';
import { ArticleProvider } from './contextApi/articleContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoriesProvider>
    <ArticlesProvider>
    <ArticleProvider>
    <RouterProvider router={router}/>
    </ArticleProvider>
    </ArticlesProvider>
    </CategoriesProvider>
  </StrictMode>
)
