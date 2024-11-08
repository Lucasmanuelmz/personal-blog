import './index.css'
export default function ErrorComponent() {
  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-title">Oops! Algo deu errado</h1>
        <p className="error-message">{"Ocorreu um erro inesperado. Por favor, tente novamente."}</p>
      </div>
    </div>
  );
}
