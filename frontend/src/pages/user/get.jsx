import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GetUser() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    console.log('User ID:', user_id);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token si nécessaire
                    }
                });
                const data = await response.json();
                console.log('API Response:', data); // Ajouter un log pour vérifier la réponse de l'API
                setUser(data.user); // Mettre à jour l'état avec l'objet utilisateur
                setName(data.user.name);
                setEmail(data.user.email);
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur:', error);
            }
        };

        if (user_id) {
            fetchUser();
        }
    }, [user_id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/${user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token si nécessaire
                },
                body: JSON.stringify({ name, email })
            });
            const data = await response.json();
            console.log('Update Response:', data); // Ajouter un log pour vérifier la réponse de l'API
            setUser(data.user); // Mettre à jour l'état avec l'objet utilisateur mis à jour
            setIsEditing(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/${user_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token si nécessaire
                }
            });
            if (response.ok) {
                console.log('User deleted successfully');
                localStorage.removeItem('user_id');
                localStorage.removeItem('token');
                navigate('/'); // Rediriger vers la page de connexion après suppression
            } else {
                console.error('Erreur lors de la suppression du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
        }
    };

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Vos Informations</h1>
            {isEditing ? (
                <div>
                    <label>
                        Nom:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleSave}>Sauvegarder</button>
                </div>
            ) : (
                <div>
                    <p>Nom: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleEdit}>Éditer</button>
                </div>
            )}
            {isConfirmingDelete ? (
                <div>
                    <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                    <button onClick={handleDelete}>Oui</button>
                    <button onClick={() => setIsConfirmingDelete(false)}>Non</button>
                </div>
            ) : (
                <button onClick={() => setIsConfirmingDelete(true)}>Supprimer le compte</button>
            )}
        </div>
    );
}

export default GetUser;