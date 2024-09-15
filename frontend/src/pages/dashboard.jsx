import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectChart from '../components/project_chart';
import ProjectChartCard from '../components/project_chart_card';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError('Vous devez être connecté pour accéder à cette page.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/projects`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProjects(response.data.projects);
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