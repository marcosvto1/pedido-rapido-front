import './App.css';

function App() {
  return (
    <div className="App">
      <div className="card w-96 bg-black shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary">Acessar</h2>
          <div>
            <input type="text" placeholder="Seu E-Mail" className="input w-full max-w-xs" />
            <input type="password" placeholder="Sua Senha" className="input w-full max-w-xs mt-3" />
          </div>
          <div className="justify-end card-actions mt-2">
            <button className="btn btn-primary w-full">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
