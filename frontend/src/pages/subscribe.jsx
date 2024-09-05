import React from 'react';

function Subscribe() {
    return (
        <>
            <Header />
            <div className="subscribe">
                <form>
                    <h1>S'incrire</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    <p>Vous avez déjà un compte ? <a href="/login">Connectez-vous</a></p>
                </form>
            </div>
        </>
    );
}

export default Subscribe;