import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [backendData, setBackendData] = useState(undefined);

  useEffect(() => {
    fetch("/api/test").then(
      response => response.json()
    ).then((data) => {
      setBackendData(data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{JSON.stringify(backendData)}</p>
      </header>
    </div>
  );
}

export default App;
