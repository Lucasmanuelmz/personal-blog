import { useState } from 'react';
import './index.css';

export default function Signup() {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telphone: '',
    password: '',
    repeatpassword: '',
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:5000/users', user)

    .then(() => {
      console.log('Usuario criado com sucesso')
    })

    .catch(error => {
      console.log('erro ao criar usuario ',{error: error.message})
    })

  }

  return(
    <form onSubmit={handleSubmit} className="auth">
     <h2 className='title'>Crie uma nova conta</h2>
      <div className="contains-form">
      <div className="auth-container">
        <label htmlFor="first-name">Nome:</label>
        <input type="text" 
        value={user.firstname} 
        onChange={handleChange} 
        name="firstname" 
        id='first-name' required />
      </div>
      <div className="auth-container">
        <label htmlFor="last-name">Sobrenome:</label>
        <input type="text" 
        value={user.lastname} 
        onChange={handleChange} 
        name="lastname" 
        id='last-name' required />
      </div>
      <div className="auth-container">
        <label htmlFor="email">Email:</label>
        <input type="email" 
        value={user.email} 
        onChange={handleChange} 
        name="email" 
        id='email' required/>
      </div>
      <div className="auth-container">
        <label htmlFor="telphone">Tel:</label>
        <input type="tel" 
        value={user.telphone} 
        onChange={handleChange} 
        name="telphone" 
        id='telphone' required />
      </div>
      </div>
      <div className="contains-password">
      <div className="auth-container">
        <label htmlFor="password">Senha:</label>
        <input type="password" 
        value={user.password} 
        onChange={handleChange} 
        name="password" 
        id='password' required/>
      </div>
      <div className="auth-container">
        <label htmlFor="repeat-password">Confirmar senha:</label>
        <input type="password" 
        value={user.repeatpassword} 
        onChange={handleChange} 
        name="repeatpassword" 
        id='repeat-password' required/>
      </div>
      </div>
      <button type='submit'>Enviar dados</button>
    </form>
  )
}