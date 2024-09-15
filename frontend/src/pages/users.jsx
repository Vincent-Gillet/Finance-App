import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/components/user_card.css";
import UserCard from '../components/user_card';
import "../styles/pages/users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialiser useNavigate

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token); 

            if (!token) {
                setError('Vous devez être connecté pour accéder à cette page.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsers(response.data.users); // Assurez-vous que vous accédez à la bonne propriété
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('Non authentifié. Veuillez vous reconnecter.');
                } else {
                    setError('Erreur lors de la récupération des données.');
                }
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError('Erreur lors de la suppression de l\'utilisateur.');
        }
    };

    const handleEdit = (userId) => {
        navigate(`/users/${userId}`);
    };

    return (
        <>
            <div className='container'>
                <h1>Users</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!error && users.length === 0 && <p>Chargement...</p>}
                {users.length > 0 && (
                    <div className='container_card'>
                        {users.map(user => (
                            <UserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Users;