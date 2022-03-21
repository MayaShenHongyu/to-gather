import './App.css';
import { useEffect, useState } from 'react';
import Profile from './Profile/Profile'
import Landing from './Landing/Landing';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

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
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>  
    
    // <div className="App">
    //   <p>{JSON.stringify(backendData)}</p>
    // </div>
  );
}

export default App;
