import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ project, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleShow = (id) => {
        navigate(`/projects/${id}`);
    };

    return (
        <div className="card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Objectif : {project.goal_money}</p>
            <p>Total : {project.state_money}</p>
            <div className='card_box_button'>
                <button onClick={() => handleShow(project.id)}>Voir</button>
                <button onClick={() => onEdit(project.id)}>Modifier</button>
                <button onClick={() => onDelete(project.id)}>Supprimer</button>
            </div>
        </div>
    );
}

export default ProjectCard;