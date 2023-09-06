import React, { useState } from 'react';
import {auth} from "../Firebase/Firebase"
import {signInWithEmailAndPassword } from 'firebase/auth';
import{Link} from "react-router-dom"
import "./Login.css";
import { useNavigate } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
    const loginForm = async(e) => {
        e.preventDefault();
        try {
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("userCredential", userCredential);
            const user = userCredential.user;
         console.log("user.accessToke",user.accessToken)
            localStorage.setItem('logintoken', user.accessToken);
            localStorage.setItem('loginuser', JSON.stringify(user));
navigate("/")

        } catch (error) {
            console.log("Error", error)
            alert(error);
        }
 }   

  return (
    <div className="login-container">
    <h1 className="login-title">Login Page</h1>
    <form onSubmit={loginForm} className="login-form">
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <input type="submit" value={"Submit"} className="login-submit" />
    </form>
    <Link to="/signup" className="login-link">
      Create account
    </Link>
  </div>
  )
}

export default Login;