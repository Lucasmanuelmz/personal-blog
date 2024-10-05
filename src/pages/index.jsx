import bigCard from '../assets/image/code.jpg';
import './index.css'

export default function HomePage() {
  return(
    <main>
      <section className="container">
        <h1>Meu Portfólio de Desenvolvedor Web Full-Stack</h1>
        <div className="big-card">
          <img src={bigCard} alt="" />
          <div>
            <p>Bem-vindo ao repositório do meu portfólio de desenvolvedor web full-stack! Este projeto é uma vitrine das minhas habilidades e projetos que desenvolvi ao longo da minha jornada como programador. Focado em JavaScript, React e Node.js, ele destaca minhas capacidades no front-end e back-end.</p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="card-container">
          <div className="card">
            <img src={bigCard} alt="" className="card-image" />
            <div>
              <h4>Titulo completo do artigo</h4>
            <p>Bem-vindo ao repositório do meu portfólio de desenvolvedor web full-stack! Este projeto é uma vitrine das minhas habilidades e projetos que desenvolvi ao longo da minha jornada como programador. Focado em JavaScript, React e Node.js, ele destaca minhas capacidades no front-end e back-end.</p>
            </div>
          </div>
          <div className="card">
          <img src={bigCard} alt="" className="card-image" />
          <div>
          <h4>Titulo completo do artigo</h4>
            <p>Bem-vindo ao repositório do meu portfólio de desenvolvedor web full-stack! Este projeto é uma vitrine das minhas habilidades e projetos que desenvolvi ao longo da minha jornada como programador. Focado em JavaScript, React e Node.js, ele destaca minhas capacidades no front-end e back-end.</p>
            </div>
          </div>
          <div className="card">
          <img src={bigCard} alt="" className="card-image" />
          <div>
          <h4>Titulo completo do artigo</h4>
            <p>Bem-vindo ao repositório do meu portfólio de desenvolvedor web full-stack! Este projeto é uma vitrine das minhas habilidades e projetos que desenvolvi ao longo da minha jornada como programador. Focado em JavaScript, React e Node.js, ele destaca minhas capacidades no front-end e back-end.</p>
            </div>
          </div>
          <div className="card">
          <img src={bigCard} alt="" className="card-image" />
          <div>
          <h4>Titulo completo do artigo</h4>
            <p>Bem-vindo ao repositório do meu portfólio de desenvolvedor web full-stack! Este projeto é uma vitrine das minhas habilidades e projetos que desenvolvi ao longo da minha jornada como programador. Focado em JavaScript, React e Node.js, ele destaca minhas capacidades no front-end e back-end.</p>
            </div>
          </div>
        </div>
        <form action="#" className="form">
          <h3>Envie nos uma mensagem para obter mais informacoes</h3>

          <label htmlFor="name">Nome:
          <input type="text" name='name' id='name' />
          </label>
          <label htmlFor="email">Email:
          <input type="email" name='email' id='email' />
          </label>
          <button>Enviar</button>
        </form>
      </section>
    </main>
  )
}