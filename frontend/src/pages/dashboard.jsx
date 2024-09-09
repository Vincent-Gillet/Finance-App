import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectChart from '../components/project_chart'; // Assurez-vous que le chemin est correct
import ProjectChartCard from '../components/project_chart_card'; // Importer le composant ProjectCard

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage
            if (!token) {
                setError('Vous devez être connecté pour accéder à cette page.');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/auth/projects', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects(response.data.projects); // Assurez-vous que vous accédez à la bonne propriété
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('Non authentifié. Veuillez vous reconnecter.');
                } else {
                    setError('Erreur lors de la récupération des projets.');
                }
            }
        };

        fetchProjects();
    }, []);

    // Calculer les totaux
    const totalGoalMoney = projects.reduce((acc, project) => acc + project.goal_money, 0);
    const totalStateMoney = projects.reduce((acc, project) => acc + project.state_money, 0);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Avancée sur vos projets</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Nombre des projets créés : {projects.length}</p>
            <ProjectChart goalMoney={totalGoalMoney} stateMoney={totalStateMoney} />
            <button onClick={() => navigate('/projects')}>Voir tous les projets</button>
            <div className="project-cards">
                {projects.map(project => (
                    <ProjectChartCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;