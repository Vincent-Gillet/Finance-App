import React from 'react';

function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className='card'>
            <p>Nom : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Vérifié : {user.email_verified_at ? 'Oui' : 'Non'}</p>
            <div className='card_box_button'>
                <button onClick={() => onEdit(user.id)}>Modifier</button>
                <button onClick={() => onDelete(user.id)}>Supprimer</button>
            </div>
        </div>
    );
}

export default UserCard;