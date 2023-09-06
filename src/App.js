
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import PomodoroTimer from './Components/PomodoroTimer/PomodoroTimer';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import { useEffect, useState } from 'react';




function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('logintoken');
    setToken(tokenFromLocalStorage)
     },[])

return (
    <div className="App">
       <Router>
        <Routes>
        <Route exact path="/" element={token != null ? <PomodoroTimer/>:<Login/>} />
        <Route exact path="/login" element={ <Login/>} />
        <Route exact path="/signup" element={ <SignUp/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
