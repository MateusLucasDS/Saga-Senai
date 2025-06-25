import './App.css';
import { useState } from 'react';
import logotipo from './assets/logotipo.png';

function App() {
  const [tela, setTela] = useState('inicio');

  return (
    <div className="App">
      <header>
        <img src={logotipo} className="App-logo" alt="logo" />
        
        <nav>
          <button onClick={() => setTela('inicio')}>inicio</button>
          <button onClick={() => setTela('programa')}>programa</button>
          <button onClick={() => setTela('ajustes')}>ajustes</button>
        </nav>
      </header>

      <main>
        {tela === 'inicio' && <h1>Bem-vindo ao Flash!</h1>}
        {tela === 'programa' && <h1>Programa</h1>}
        {tela === 'ajustes' && <h1>Ajustes</h1>}
      </main>

      <footer>
        <p>© 2025 - Seu Projeto</p>
      </footer>
    </div>
  );
}

export default App;