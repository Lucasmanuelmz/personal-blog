import { lazy, Suspense, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './index.css';
import axios from 'axios';
import { useCategories } from '../../contextApi/categoryContext';
const Loading = lazy(() => import('../loading/index'))

export default function CreateArticle() {
  const [text, setText] = useState(
    {
      title: '', 
      categoryId: '', 
      description: ''
    });
  const [file, setFile] = useState(null); 
  const editorRef = useRef(null);
  const {categories} = useCategories();

  function handleChange(e) {
    const {name, value} = e.target;
    setText(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();

    if(editorRef.current) {
      const content = editorRef.current.getContent();
      formData.append('article', content);
    } else {
      console.log('Editor ainda não está pronto');
    }

    formData.append('title', text.title);
    formData.append('description', text.description);
    formData.append('file', file); 
    formData.append('categoryId', text.categoryId);

    axios.post('http://localhost:5000/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      console.log('Artigo postado com sucesso!');
    })
    .catch(error => {
      console.log('Erro:', error.message);
    });
  }

  return (
    <Suspense fallback={<Loading/>}>
    <main className='main'>
      <form onSubmit={handleSubmit} className="form-editor">
        <legend>Crie um artigo</legend>
        <div className="container-div">
          <label htmlFor="title">Título</label>
          <input type="text" name='title' id='title' value={text.title} onChange={handleChange} />
        </div>

        <textarea name="description" value={text.description} onChange={handleChange} id=""></textarea>
      
        <label className="container-image" htmlFor="file">Carregar imagem
          <input style={{display: 'none'}} 
          type="file" 
          name='file' 
          id='file' 
          onChange={handleFileChange} 
          accept='image/'/>
          
        </label>
        {categories && categories.length > 0 && (
          <select name="categoryId" value={text.categoryId} id="categoryId" onChange={handleChange} className="select">
            <option value='' disabled>Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
        )}
        <Editor
          apiKey='8d1v1qdgpz4dpvymqmk87cec15ji2wiho2yme8ue8qg2432o'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        <button type="submit">Criar artigo</button>
      </form>
    </main>
    </Suspense>
  );
}
