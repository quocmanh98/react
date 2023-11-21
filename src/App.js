import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{ fontSize: '2em', margin: '10px 0', color: '#333' }}>Welcome to My React App</h1>
        <p style={{ fontSize: '1.5em', color: '#555' }}>Hi, I'm Quốc Mạnh</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '1.2em', color: '#61dafb', textDecoration: 'none' }}
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
