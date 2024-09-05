import React from 'react';
import '../styles/pages/login.css';

import Header from '../components/header';

function Login() {
    return (
      <>
        <Header />
        <div className="login">
            <form>
                <h1>Login</h1>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <p>Vous n'avez pas de compte ? <a href="/subscribe">Inscrivez-vous</a></p>
            </form>
        </div>
      </>  
    );
}

export default Login;
