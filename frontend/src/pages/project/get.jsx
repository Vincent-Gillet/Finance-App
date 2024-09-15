import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProjectChart from '../../components/project_chart';


function GetProject() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Vous devez être connecté pour accéder à cette page.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/projects/${id}`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProject(response.data.project);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('Non authentifié. Veuillez vous reconnecter.');
                } else {
                    setError('Erreur lors de la récupération du projet.');
                }
            }
        };

        fetchProject();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!project) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <ProjectChart goalMoney={project.goal_money} stateMoney={project.state_money} />
            <p>{project.description}</p>
            <p>Objectif : {project.goal_money}</p>
            <p>Total : {project.state_money}</p>
        </div>
    );
}

export default GetProject;