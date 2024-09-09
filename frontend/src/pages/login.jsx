import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                email,
                password
            });

            console.log('Response:', response); // Afficher la réponse complète dans la console

            const token = response.data.accessToken;
            const userId = response.data.user_id; // Utiliser la bonne propriété pour l'ID de l'utilisateur

            console.log('Token:', token); // Afficher le token dans la console pour vérification
            console.log('User ID:', userId); // Afficher l'ID de l'utilisateur dans la console pour vérification

            if (token && userId) {
                localStorage.setItem('token', token); // Stocker le token dans localStorage
                localStorage.setItem('user_id', userId); // Stocker l'ID de l'utilisateur dans localStorage
                setSuccess('Connexion avec succès !');
                navigate('/dashboard'); // Rediriger vers la page dashboard
            } else {
                setError('Token ou ID utilisateur non trouvé dans la réponse.');
            }
        } catch (error) {
            setError('Erreur lors de votre connexion du compte.');
        }
    };

    return (
        <>
            <div className="login subscribe">
                <form onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email" // Ajout de l'attribut autocomplete
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" // Ajout de l'attribut autocomplete
                    />
                    <button type="submit">Connexion</button>
                    <p>Vous n'avez pas de compte ? <a href="/subscribe">Inscrivez-vous</a></p>
                </form>
            </div>
        </>
    );
}

export default Login;