import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/project_card';
import '../styles/pages/projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

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

    const handleDelete = async (projectId) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError('Vous devez être connecté pour supprimer un projet.');
            return;
        }

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/auth/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) { 
                setProjects(projects.filter(project => project.id !== projectId));
                window.location.reload();
            } else {
                setError('Erreur lors de la suppression du projet.');
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('Erreur interne du serveur lors de la suppression du projet.');
            } else {
                setError('Erreur lors de la suppression du projet.');
            }
        }
    };

    return (
        <>
            <div className="projects">
                <h1>Projects</h1>
                <button onClick={() => window.location.href = '/projects/new'} className='button_main'>Nouveau projet</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {projects.length === 0 && !error && <p>Chargement...</p>}
                {projects.length > 0 && (
                    <div className="container_card">
                        {projects.map(project => (
                        <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
                    ))}
                    </div>
                )}
            </div>    
        </>
    );
}

export default Projects;