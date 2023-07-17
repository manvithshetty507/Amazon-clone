import React, {useState} from 'react';
import "./Login.css";

import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .then(auth => {
            navigate('/');
          })
          .catch(error => alert(error.message));
      };
    
      const register = e => {
        e.preventDefault();
    
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(auth => {
            if (auth) {
              navigate('/');
            }
          })
          .catch(error => alert(error.message));
      };

  return (
    <div className='login'>
      <img
        className='login__logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
        alt='Amazon Logo'
      />

      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          <h5>Email</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

          <button className='login__signinButton' onClick={signIn}>
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to the conditions of use & sale of Amazon-Clone. Please see our Privacy Info Notice,
          our Cookies Notice, and our Interest-Based Ads Notice.
        </p>

        <button className='login__registerButton' onClick={register}>
          Create your Amazon Account
        </button>
      </div>
      
    </div>
  )
}

export default Login
