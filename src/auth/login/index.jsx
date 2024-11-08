import { useState } from "react"

export default function Login() {
  const [login, setLogin] = useState({email:'', password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setLogin(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
   e.preventDefault();
   fetch('http://localhost:5000/login', login)
   .then(() => {
    console.log('Logado com sucesso na sua conta')
   })

   .catch(error => {
    console.error({error: error.message})
   })
  }

  return(
    <form onSubmit={handleSubmit} className="auth">
     <h2 className="title">Entre na sua conta</h2>
      <div className="auth-container">
        <label htmlFor="email">Email:</label>
        <input type="text" 
        value={login.email} 
        onChange={handleChange} 
        name="email" 
        id="email"/>
      </div>

      <div className="auth-container">
        <label htmlFor="password">Senha:</label>
        <input type="text" 
        value={login.password} 
        onChange={handleChange} 
        name="password" 
        id="password" />
      </div>

      <button type="submit">Entrar na conta</button>
    </form>
  )
}