import { ReadArticleProvider, useArticle } from "../../contextApi/readContext";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import './index.css'
import { useEffect } from "react";

export function ReadPage() {
  const {id} = useParams();
  return(
    <ReadArticleProvider id={id}>
      <ReadArticle />
    </ReadArticleProvider>
  )
}

export default function ReadArticle() {
  const {article} = useArticle()

  function formatDate(date) {
    return new Date(date).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

useEffect(() => {
  if(article) {
   document.title = article.title
   document
   .querySelector('meta[name="description"]')
   .setAttribute('content', article.description || 'Aprenda tudo sobre desenvolvimento web full stack neste blog. Compartilhamos informações sobre frontend, backend, entre outros.');
  }
},[article])

  return (
    <main>
      {article ? (
        <article className="article">
          <h1>{article.title}</h1>
          <img src={article.url} alt="" />
          <div>{ReactHtmlParser(article.article)}</div>
          <span style={{
            textAlign: 'right',
            display: 'block'
          }}>Pubicado em: {formatDate(article.createdAt)}</span>
        </article>
      ) : (
        <div>No article found.</div> 
      )}
    </main>
  );
}
