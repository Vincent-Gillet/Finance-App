import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/project/main_project.css';

function PostProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalMoney, setGoalMoney] = useState('');
    const [stateMoney, setStateMoney] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Vous devez être connecté pour ajouter un projet.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/projects', {
                title,
                description,
                goal_money: goalMoney,
                state_money: stateMoney,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccess('Projet ajouté avec succès!');
            setTitle('');
            setDescription('');
            setGoalMoney('');
            setStateMoney('');
            navigate('/projects');
        } catch (error) {
            setError('Erreur lors de l\'ajout du projet.');
        }
    };

    return (
        <div className='container'>
            <h1>Nouveau Projet</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit} className='form_project'>
                <div className='form_box'>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='form_box'>
                    <label htmlFor="description">Description :</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='form_box'>
                    <label htmlFor="goalMoney">Objectif :</label>
                    <input
                        type="number"
                        id="goalMoney"
                        value={goalMoney}
                        onChange={(e) => setGoalMoney(e.target.value)}
                        required
                    />
                </div>
                <div className='form_box'>
                    <label htmlFor="stateMoney">Total :</label>
                    <input
                        type="number"
                        id="stateMoney"
                        value={stateMoney}
                        onChange={(e) => setStateMoney(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default PostProject;