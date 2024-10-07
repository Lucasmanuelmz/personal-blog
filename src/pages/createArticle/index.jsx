import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './index.css';
import axios from 'axios';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null); 
  const editorRef = useRef(null);
  const content = editorRef.current.getContent()

  function handleChange(e) {
    const {value} = e.target;
    setTitle(value);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('title', title);
    formData.append('article', content); 
    formData.append('file', file); 

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
    <main className='main'>
      <form onSubmit={handleSubmit} className="form-editor">
        <legend>Crie um artigo</legend>
        <div className="container-div">
          <label htmlFor="title">Título</label>
          <input type="text" name='title' id='title' value={title} onChange={handleChange} />
        </div>
      
        <label className="container-image" htmlFor="file">Carregar imagem
          <input style={{display: 'none'}} 
          type="file" 
          name='file' 
          id='file' 
          onChange={handleFileChange} 
          accept='image/'/>
          
        </label>
       
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
  );
}
