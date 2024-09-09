import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/subscribe.css';

function Subscribe() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
                name,
                email,
                password
            });

            setSuccess('Compte créé avec succès !');
            // Rediriger vers la page de connexion après un délai
            setTimeout(() => {
                navigate('/');
            }, 1000); // 2 secondes de délai avant la redirection
        } catch (error) {
            setError('Erreur lors de la création du compte.');
        }
    };

    return (
        <>
            <div className="container">
                <div className="subscribe">
                    <form onSubmit={handleSubmit}>
                        <h1>Inscription</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <input
                            type="text"
                            placeholder="Nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">S'Inscrire</button>
                        <p>Vous avez déjà un compte ? <a href="/">Connectez-vous</a></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Subscribe;