import React, { useState } from 'react';
import {auth} from "../Firebase/Firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./signup.css";
import { useNavigate,Link  } from "react-router-dom";



function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate()
    const signupForm = async(e) => {
        e.preventDefault();
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("userCredential", userCredential);
            const user = userCredential.user;
            localStorage.setItem('logintoken', user.accessToken);
            localStorage.setItem('loginuser', JSON.stringify(user));
navigate('/')

        } catch (error) {
            console.log(error)
       alert(error.code)
        }
 }   

  return (
      <div>
          <h1>Sign Up</h1>
          <form onSubmit={signupForm}>
              <input type="email"
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
              />

<input type="password"
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
              />
<input type="submit" value={"Submit"}/>
          </form>
          <Link to={"/login"}>already have an account</Link>
    </div>
  )
}

export default SignUp