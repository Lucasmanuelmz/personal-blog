import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './routes';
import './index.css'
import { CategoriesProvider } from './contextApi/categoryContext';
import { ArticleProvider } from './contextApi/articleContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoriesProvider>
    <ArticleProvider>
    <RouterProvider router={router}/>
    </ArticleProvider>
    </CategoriesProvider>
  </StrictMode>
)
