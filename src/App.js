import './App.css';
import { useState } from 'react';
import logotipo from './assets/logotipo.png';
import Inicio from './components/Inicio';
import Programa from './components/Programa';
import Ajustes from './components/Ajustes';
import { CameraProvider } from './components/CameraContext'; // ✅ importa o provider

function App() {
  const [tela, setTela] = useState('inicio');

  return (
    <CameraProvider> {/* ✅ envolve tudo com o provider */}
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
          {tela === 'inicio' && <Inicio />}
          {tela === 'programa' && <Programa />}
          {tela === 'ajustes' && <Ajustes />}
        </main>

        <footer>
          <p>© 2025 - Entrada Flash</p>
        </footer>
      </div>
    </CameraProvider>
  );
}

export default App;
