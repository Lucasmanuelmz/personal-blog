
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import './index.css';
import { useEffect, lazy, Suspense } from "react";
import { ReadArticleProvider, useReadArticle } from "../../contextApi/readContext";
import AnimationSplash from "../../components/animationSplash";
import DOMPurify from 'dompurify';
import ErrorComponent from "../../components/errorComponent";
const Loading  = lazy(() => import("../loading"));

export function ReadPage() {
  const {slug} = useParams();
  console.log(`Recebi o slug aqui no componete de leitura do artigo: ${slug}`)

  return (
  <ReadArticleProvider slug={slug} >
    <Suspense fallback={<Loading />}>
    <ReadArticle />
    </Suspense>
  </ReadArticleProvider>
  );
}

export default function ReadArticle() {
  const {readArticle, loading, error} = useReadArticle();
  console.log(`O artigo recebido: ${readArticle}`)
 
  function formatDate(date) {
    return new Date(date).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  useEffect(() => {
    if (readArticle) {
      document.title = readArticle.title;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          readArticle.description || 'Aprenda tudo sobre desenvolvimento web full stack neste blog. Compartilhamos informações sobre frontend, backend, entre outros.'
        );
    }
  }, [readArticle]);

  if (loading) {
    return(
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <AnimationSplash />
    </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar o artigo. Tente novamente mais tarde.</div>;
  }

  const cleanContent = DOMPurify.sanitize(readArticle.article, {
    USE_PROFILES: { html: true }, 
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'ul', 'li'], 
    ALLOWED_ATTR: ['href', 'title', 'alt', 'src'], 
   })

  return (
    <Suspense fallback={<Loading />}>
    <main>
      {readArticle ? (
        <article className="article">
          <h1>{readArticle.title}</h1>
          <img src={readArticle.url} alt={readArticle.title} />
          <div>{ReactHtmlParser(cleanContent)}</div>
          <div className="commer">
            Publicado em: {formatDate(readArticle.createdAt)}<span></span>
            <div style={{color: 'orangered'}}>{readArticle.category.name}</div>
          </div>
        </article>
      ) : (
      <ErrorComponent/>
      )}
    </main>
    </Suspense>
  );
}
